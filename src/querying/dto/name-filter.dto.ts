import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class NameFilterDto {
  @ApiProperty({
    description: "a string value as name",
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;
}
