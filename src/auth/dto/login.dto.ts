import { CreateUserDto } from "@/domain/users/dto/create-user.dto.js";
// import { PickType } from "@nestjs/mapped-types";
import { ApiProperty, PickType } from "@nestjs/swagger";

export class LoginDto extends PickType(CreateUserDto, [
  "email",
  "password",
] as const) {
  @ApiProperty({
    description: "valid user email address",
    example: "tom@example.com",
    required: true,
  })
  email: string;

  @ApiProperty({
    description: "valid user password",
    required: true,
    example: "Password@123",
  })
  password: string;
}
