import { IsEntity } from "@/common/decorators/validators/is-entity.decorator.js";
import { IdDto } from "@/common/dtos/id.dto.js";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayNotEmpty, ValidateNested } from "class-validator";
import { OrderItemDto } from "./order-item.dto.js";

export class CreateOrderDto {
  @ApiProperty({
    description: "customer id as positive integer value",
    minimum: 1,
    maximum: 1000,
    required: true,
  })
  @IsEntity()
  readonly customer: IdDto;

  @ApiProperty({
    description: "list of ordered items",
  })
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => OrderItemDto)
  readonly items: OrderItemDto[];
}
