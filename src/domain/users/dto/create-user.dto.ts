import { IsPassword } from "@/common/decorators/validators/is-password.decorator.js";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
export class CreateUserDto {
  @ApiProperty({
    description: "full name of the user",
    example: "Tom Brady",
  })
  @Length(2, 128)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: "valid user email address",
    example: "tom@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: "valid user phone number",
    example: "+413456789",
  })
  // @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({
    description:
      "**REQUIRES**:\n1. minimum 8 to maximum 32 characters without spaces.\n2. must have at least\n- 1 capital letter\n - 1 small letter\n - 1 digit\n - 1 special character from !$@%#",
    example: "Password$100",
  })
  @IsPassword()
  @IsNotEmpty()
  readonly password: string;
}

/**
 * REQUIRES:
 *  "requires:\nminimum 8 to maximum 32 characters.\n must have at least\n- 1 capital letter\n- 1 small letter\n- 1 digit\n- 1 special character from !$@%#",
 * EXAMPLE: "Password$100"
 */
