import { Public } from "@/auth/decorators/public.decorator.js";
import { Roles } from "@/auth/decorators/roles.decorator.js";
import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { IdDto } from "@/common/dtos/id.dto.js";
import { summary } from "@/common/templates/api-operation.template.js";
import { responseMsg } from "@/common/templates/response-messages.template.js";
import { PaginationDto } from "@/querying/dto/pagination.dto.js";
import {
  idParamOptions,
  limitQueryOptions,
  offsetQueryOptions,
} from "@/querying/util/query-options.util.js";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CategoriesService } from "./categories.service.js";
import { CreateCategoryDto } from "./dto/create-category.dto.js";
import { UpdateCategoryDto } from "./dto/update-category.dto.js";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @ApiOperation({ summary: summary.createCategory })
  @ApiResponse({ status: 201, description: responseMsg.categoryCreated })
  @Roles(ROLE.MANAGER)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  /** Find all categories */
  @ApiOperation({ summary: summary.findCategory })
  @ApiResponse({
    status: 200,
    description: responseMsg.categoriesFound,
  })
  @ApiQuery(limitQueryOptions)
  @ApiQuery(offsetQueryOptions)
  @Public()
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.categoriesService.findAll(paginationDto);
  }

  /** Find a category by id */
  @ApiOperation({ summary: summary.findCategory })
  @ApiResponse({ status: 200, description: responseMsg.categoryFound })
  @ApiParam(idParamOptions)
  @Public()
  @Get(":id")
  findOne(@Param() { id }: IdDto) {
    return this.categoriesService.findOne(id);
  }

  /** Update a category */
  @ApiOperation({ summary: summary.updateCategory })
  @ApiResponse({ status: 201, description: responseMsg.categoryUpdated })
  @ApiParam(idParamOptions)
  @Roles(ROLE.MANAGER)
  @Patch(":id")
  update(@Param() { id }: IdDto, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  /** Delete a category */
  @ApiOperation({ summary: summary.deleteCategory })
  @ApiResponse({ status: 201, description: responseMsg.categoryDeleted })
  @ApiParam(idParamOptions)
  @Roles(ROLE.MANAGER)
  @Delete(":id")
  remove(@Param() { id }: IdDto) {
    return this.categoriesService.remove(id);
  }
}
