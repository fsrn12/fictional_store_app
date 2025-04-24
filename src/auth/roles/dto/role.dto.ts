import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { ROLE } from "../enums/role.enum.js";

export class RoleDto {
  @ApiProperty({
    description: "Application user role",
    enum: ROLE,
  })
  @IsEnum(ROLE)
  readonly role: ROLE;
}
