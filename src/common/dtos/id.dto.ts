import { IsCardinal } from "@/common/decorators/validators/is-cardinal.decorator.js";
import { ApiProperty } from "@nestjs/swagger";
import { Max } from "class-validator";
import { MAX_INT_32 } from "common/utils/common.constants.js";

export class IdDto {
  @ApiProperty({
    description: "a positive integer as value",
    type: "number",
    minimum: 1,
    maximum: MAX_INT_32,
    example: 1,
  })
  @Max(MAX_INT_32)
  @IsCardinal()
  readonly id: number;
}
