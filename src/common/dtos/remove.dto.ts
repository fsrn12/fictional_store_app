import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { IsBoolean } from "../decorators/validators/is-boolean.decorator.js";

export class RemoveDto {
  @ApiProperty({
    description: "a true or false value",
    type: Boolean,
    required: false,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  readonly soft?: boolean;
}
