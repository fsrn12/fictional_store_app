// import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./create-category.dto.js";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
