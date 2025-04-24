import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ description: "name of the category", example: "Fashion" })
  @Length(2, 50)
  @IsString()
  readonly name: string;
}
