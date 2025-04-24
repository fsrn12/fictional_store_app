import { IsCardinal } from "@/common/decorators/validators/is-cardinal.decorator.js";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Max } from "class-validator";
import { MAX_PAGE_NUMBER, MAX_PAGE_SIZE } from "../util/querying.constants.js";

export class PaginationDto {
  @ApiProperty({
    description:
      "positive integer number to indicate number of results per query",
    required: false,
    default: 4,
  })
  @Max(MAX_PAGE_SIZE)
  @IsCardinal()
  @IsOptional()
  readonly limit?: number;

  @ApiProperty({
    description: "positive integer number to indicate page number",
    required: false,
    default: 1,
  })
  @Max(MAX_PAGE_NUMBER)
  @IsCardinal()
  @IsOptional()
  readonly page?: number = 1;
}
