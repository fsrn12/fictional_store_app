// import { PartialType } from "@nestjs/mapped-types";
import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto.js";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
