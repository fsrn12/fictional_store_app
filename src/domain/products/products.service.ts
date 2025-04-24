import { FilesService } from "@/files/files.service.js";
import { FilePath, MAX_FILE_COUNT } from "@/files/utils/file.constant.js";
import { FilteringService } from "@/querying/filter.service.js";
import { PaginationService } from "@/querying/pagination.service.js";
import { DefaultPageSize } from "@/querying/util/querying.constants.js";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { QueryProductsDto } from "../../querying/dto/querying/query-products.dto.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { Product } from "./entities/product.entity.js";

@Injectable()
export class ProductsService {
  private readonly MAX_IMAGES_COUNT = MAX_FILE_COUNT.PRODUCT_IMAGES || 5;
  private readonly IMAGES_PATH = FilePath.Products;
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
    private readonly paginationService: PaginationService,
    private readonly filteringService: FilteringService,
    private readonly filesService: FilesService,
    private readonly dataSource: DataSource,
  ) {}

  public async create(createProductDto: CreateProductDto) {
    try {
      let product = this.repo.create(createProductDto);
      return await this.repo.save(product);
    } catch (err) {
      throw new ConflictException(err, {
        description: "Could not create new product. Try again",
      });
    }
  }

  public async findAll(queryProductDto: QueryProductsDto) {
    let { page, name, price, categoryId, sort, order } = queryProductDto;
    const limit = queryProductDto.limit ?? DefaultPageSize.PRODUCTS;
    const offset = +this.paginationService.calculateOffset(limit, page ?? 1);

    const [data, count] = await this.repo.findAndCount({
      where: {
        name: this.filteringService.contains(name),
        price: this.filteringService.compare(price),
        categories: { id: categoryId },
      },
      order: { [sort]: order },
      skip: offset,
      take: limit,
    });
    const meta = this.paginationService.createMeta(limit, page, count);
    return [...data, meta];
  }

  public findOne(id: number) {
    return this.repo.findOneOrFail({
      where: { id },
      relations: { categories: true },
    });
  }

  public async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.repo.preload({ id, ...updateProductDto });
    if (!product) {
      throw new NotFoundException("No product found");
    }
    return await this.repo.save(product);
  }

  /** Remove product along with associated images */
  public remove(id: number) {
    return this.dataSource.transaction(async (manager) => {
      const productRepo = manager.getRepository(Product);
      const product = await productRepo.findOneByOrFail({ id });
      await productRepo.remove(product);
      await this.deleteBaseDir(id);
      return product;
    });
  }

  /** Upload / Save image */
  public async uploadImages(id: number, files: Express.Multer.File[]) {
    // const product = this.findOne(id);
    // const { BASE, IMAGES } = FilePath.Products;
    const { BASE, IMAGES } = this.IMAGES_PATH;
    await this.filesService.uploadFile(
      id,
      files,
      BASE,
      IMAGES,
      this.MAX_IMAGES_COUNT,
    );
  }

  /** Download image */
  public async downloadImage(id: number, filename: string) {
    const { BASE, IMAGES } = this.IMAGES_PATH;
    return await this.filesService.downloadFile(id, filename, BASE, IMAGES);
  }

  /** Delete image */
  public deleteImage(id: number, filename: string) {
    const { BASE, IMAGES } = this.IMAGES_PATH;
    return this.filesService.deleteFile(id, filename, BASE, IMAGES);
  }

  private async deleteBaseDir(id: number) {
    const { BASE } = this.IMAGES_PATH;
    await this.filesService.deleteDir(id, BASE);
  }

  /** Create a product with related images */
  public async createWithImages(
    createProductDto: CreateProductDto,
    files: Express.Multer.File[],
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    let result = undefined;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (err) {
      throw new RequestTimeoutException("Failed to connect to database", err);
    }
    try {
      let newProduct = queryRunner.manager.create<Product, CreateProductDto>(
        Product,
        createProductDto,
      );

      let savedProduct = await queryRunner.manager.save(newProduct);
      let id = savedProduct.id;
      await this.uploadImages(id, files);
      await queryRunner.commitTransaction();
      result = savedProduct;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException("Transaction failed", err);
    } finally {
      try {
        await queryRunner.release();
      } catch (err) {
        console.log(err, "Error releasing database connection");
      }
    }
    return result;
  }
}

// public async uploadImages(id: number, files: Express.Multer.File[]) {
//   const product = this.findOne(id);
//   const { BASE, IMAGES } = FilePath.Products;
//   const path = join(BASE, id.toString(), IMAGES);
//   if (await fse.pathExists(join(UPLOAD_BASE_PATH, path))) {
//     const incomingFileCount = files.length;
//     const dirFileCount = await this.storeageService.getDirFileCount(path);
//     const totalFileCount = incomingFileCount + dirFileCount;
//     this.storeageService.validateFileCount(
//       totalFileCount,
//       MAX_FILE_COUNT.PRODUCT_IMAGES,
//     );
//   }
//   await this.storeageService.createDir(path);
//   await Promise.all(
//     files.map((file) => this.storeageService.saveFile(path, file)),
//   );
// }
