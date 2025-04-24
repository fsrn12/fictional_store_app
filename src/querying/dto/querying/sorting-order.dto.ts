import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsOptional } from "class-validator";

const SortOrder = ["ASC", "DESC"] as const;
type SortOrder = (typeof SortOrder)[number];
export class SortingOrderDto {
  @ApiProperty({
    description: "Sort in ascending or descending order",
    required: false,
    default: SortOrder[0],
  })
  @IsIn(SortOrder)
  @IsOptional()
  readonly order?: SortOrder = "ASC";
}
