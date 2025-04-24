import { IsCardinal } from "@/common/decorators/validators/is-cardinal.decorator.js";
import { ToFilterOperationDto } from "@/querying/decorators/to-filter-operation-dto.decorator.js";
import { NameFilterDto } from "@/querying/dto/name-filter.dto.js";
import { FilterOperationDto } from "@/querying/dto/querying/filter-operation.dto.js";
import { IsOptional, ValidateNested } from "class-validator";

export class FilterProductsDto extends NameFilterDto {
  @ValidateNested()
  @ToFilterOperationDto()
  @IsOptional()
  readonly price?: FilterOperationDto;

  @IsCardinal()
  @IsOptional()
  readonly categoryId?: number;
}
