import { PaginationDto } from "@/querying/dto/pagination.dto.js";
import { PaginationService } from "@/querying/pagination.service.js";
import { DefaultPageSize } from "@/querying/util/querying.constants.js";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { UpdateCategoryDto } from "./dto/update-category.dto.js";
import { Category } from "./entities/category.entity.js";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly repo: Repository<Category>,
    private readonly paginationService: PaginationService,
  ) {}
  public async create(createCategoryDto: CreateCategoryDto) {
    let category: CreateCategoryDto;
    try {
      category = this.repo.create(createCategoryDto);
      return await this.repo.save(category);
    } catch (err) {
      throw new ConflictException(err, {
        description: "Could not create new category. Try again",
      });
    }
  }

  public async findAll(paginationDto: PaginationDto) {
    const { page } = paginationDto;
    const limit = paginationDto.limit ?? DefaultPageSize.CATEGORIES;
    const offset = this.paginationService.calculateOffset(limit, page);
    const [data, count] = await this.repo.findAndCount({
      skip: offset,
      take: limit,
    });

    const meta = this.paginationService.createMeta(limit, page, count);
    return [...data, meta];
  }

  public findOne(id: number) {
    return this.repo.findOneOrFail({
      where: { id },
      relations: { products: true },
    });
  }

  public async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.repo.preload({ id, ...updateCategoryDto });
    if (!category) {
      throw new NotFoundException("No category found");
    }
    return await this.repo.save(category);
  }

  public async remove(id: number) {
    const category = await this.findOne(id);
    if (!category) {
      throw new NotFoundException("No category found");
    }
    if (category.products.length) {
      throw new ConflictException("Category has related products");
    }
    return await this.repo.remove(category);
  }
}
