import { IsCardinal } from "@/common/decorators/validators/is-cardinal.decorator.js";
import { IsEntity } from "@/common/decorators/validators/is-entity.decorator.js";
import { IdDto } from "@/common/dtos/id.dto.js";
import { ApiProperty } from "@nestjs/swagger";

export class OrderItemDto {
  @ApiProperty({
    description: "order id as positive integer value",
    minimum: 1,
    maximum: 1000,
    type: IdDto,
    required: true,
  })
  @IsEntity()
  readonly product: IdDto;

  @ApiProperty({
    description: "order quantity as positive integer value",
    minimum: 1,
    maximum: 1000,
    required: true,
  })
  @IsCardinal()
  readonly quantity: number;
}
