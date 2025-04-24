import { Public } from "@/auth/decorators/public.decorator.js";
import { Roles } from "@/auth/decorators/roles.decorator.js";
import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { IdDto } from "@/common/dtos/id.dto.js";
import { summary } from "@/common/templates/api-operation.template.js";
import { responseMsg } from "@/common/templates/response-messages.template.js";
import { IdFilenameDto } from "@/files/dto/id-filename.dto.js";
import { BodyInterceptor } from "@/files/interceptors/body.interceptor.js";
import { FileSchema } from "@/files/swagger/schema/file.schema.js";
import { FilesSchema } from "@/files/swagger/schema/files.schema.js";
import {
  MAX_FILE_COUNT,
  MULTIPART_FORMDATA_KEY,
} from "@/files/utils/file.constant.js";
import { createParseFilePipe } from "@/files/validators/file-validation.util.js";
import { idParamOptions } from "@/querying/util/query-options.util.js";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { QueryProductsDto } from "../../querying/dto/querying/query-products.dto.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { ProductsService } from "./products.service.js";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: summary.createProduct })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.productCreated,
  })
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  /** Find products with pagination */
  @ApiOperation({ summary: summary.findProducts })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.productsFound,
  })
  @ApiQuery({ type: QueryProductsDto })
  @Public()
  @Get()
  findAll(@Query() queryProductDto: QueryProductsDto) {
    console.log("Product Controller: ", queryProductDto);
    return this.productsService.findAll(queryProductDto);
  }

  /** Find a product with id */
  @ApiOperation({ summary: summary.findProduct })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.productFound })
  @ApiParam(idParamOptions)
  @Public()
  @Get(":id")
  findOne(@Param() { id }: IdDto) {
    return this.productsService.findOne(id);
  }

  /** Update a product with id */
  @ApiOperation({ summary: summary.updateProduct })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.productUpdated,
  })
  @ApiParam(idParamOptions)
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @Patch(":id")
  update(@Param() { id }: IdDto, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  /** Delete a product with id */
  @ApiOperation({ summary: summary.deleteProduct })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.productDeleted,
  })
  @ApiParam(idParamOptions)
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @Delete(":id")
  remove(@Param() { id }: IdDto) {
    return this.productsService.remove(id);
  }
  /** ======================== =============================================
   * @                       PRODUCT IMAGES
   *  ======================== ============================================= */
  /** Upload Product Image */
  @ApiOperation({ summary: summary.uploadImage })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.imageUploaded,
  })
  @ApiParam({ ...idParamOptions, description: "product id" })
  @ApiConsumes(MULTIPART_FORMDATA_KEY)
  @ApiBody({ type: FilesSchema })
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @UseInterceptors(FilesInterceptor("files", MAX_FILE_COUNT.PRODUCT_IMAGES))
  @Post(":id/images")
  public uploadImage(
    @Param() { id }: IdDto,
    @UploadedFiles(createParseFilePipe("4MB", "png", "jpeg", "webp", "avif"))
    files: Express.Multer.File[],
  ) {
    return this.productsService.uploadImages(id, files);
  }

  /** Download Image */
  @ApiOperation({ summary: summary.downloadImage })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FileSchema,
    description: responseMsg.imageDownloaded,
  })
  @ApiParam({ ...idParamOptions, description: "product id" })
  @ApiParam({ name: "filename", type: "string" })
  @Public()
  @Get(":id/images/:filename")
  public async downloadImage(@Param() { id, filename }: IdFilenameDto) {
    return await this.productsService.downloadImage(id, filename);
  }

  /** Delete Image */
  @ApiOperation({ summary: summary.deleteImage })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.imageDeleted,
  })
  @ApiParam({ ...idParamOptions, description: "product id" })
  @ApiParam({ name: "filename", type: "string" })
  @Roles(ROLE.ADMIN, ROLE.MANAGER)
  @Delete(":id/images/:filename")
  public deleteImage(@Param() { id, filename }: IdFilenameDto) {
    return this.productsService.deleteImage(id, filename);
  }

  /** Create product with images */
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @UseInterceptors(
    FilesInterceptor("files", MAX_FILE_COUNT.PRODUCT_IMAGES),
    BodyInterceptor,
  )
  @Post("product-with-images")
  public createWithImages(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles(createParseFilePipe("4MB", "png", "jpeg", "webp", "avif"))
    files: Express.Multer.File[],
  ) {
    return this.productsService.createWithImages(createProductDto, files);
  }
}
