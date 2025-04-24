import { IsCardinal } from "@/common/decorators/validators/is-cardinal.decorator.js";
import { IsCurrency } from "@/common/decorators/validators/is-currency.decorator.js";
import { IsEntity } from "@/common/decorators/validators/is-entity.decorator.js";
import { IdDto } from "@/common/dtos/id.dto.js";
import { IdentifierFn } from "@/common/utils/id.util.js";
import { ApiProperty } from "@nestjs/swagger";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  Length,
} from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    description: "name of the product",
    minLength: 2,
    maxLength: 128,
    required: true,
    example: "Yorkshire Tea 250bags",
  })
  @Length(2, 128)
  readonly name: string;

  @ApiProperty({
    description: "brief product description",
    minLength: 2,
    maxLength: 128,
    required: false,
    example: "Very nice tea",
  })
  @Length(2, 1048)
  @IsOptional()
  readonly description?: string;

  @ApiProperty({
    description: "price of the item",
    required: true,
  })
  @IsCurrency()
  readonly price: number;

  @ApiProperty({
    description: "list of categories, the product belongs to.",
  })
  @ArrayNotEmpty()
  @ArrayUnique(IdentifierFn.ID_DTO)
  @IsEntity()
  readonly categories: IdDto[];
}
