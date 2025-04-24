import { SortingOrderDto } from "@/querying/dto/querying/sorting-order.dto.js";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";
import { Product } from "../../../domain/products/entities/product.entity.js";

const SortBy = ["name", "price"] as const satisfies (keyof Product)[];
export type SortBy = (typeof SortBy)[number];
export class SortProductsDto extends SortingOrderDto {
  @ApiProperty({
    description: "Sort products by name or price",
    required: false,
    default: SortBy[0],
  })
  @IsIn(SortBy)
  @IsOptional()
  readonly sort?: SortBy = "name";
}
