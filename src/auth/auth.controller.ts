import { IdDto } from "@/common/dtos/id.dto.js";
import { summary } from "@/common/templates/api-operation.template.js";
import { responseMsg } from "@/common/templates/response-messages.template.js";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { type Response } from "express";
import { AuthService } from "./auth.service.js";
import { Public } from "./decorators/public.decorator.js";
import { Roles } from "./decorators/roles.decorator.js";
import { User } from "./decorators/user.decorator.js";
import { LoginDto } from "./dto/login.dto.js";
import { LocalAuthGuard } from "./guards/local-auth.guard.js";
import type { RequestUser } from "./interfaces/request-user.interface.js";
import { RoleDto } from "./roles/dto/role.dto.js";
import { ROLE } from "./roles/enums/role.enum.js";
import { JwtCookieHeader } from "./swagger/jwt-cookie.header.js";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: summary.loginUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.userLoggedIn,
    headers: JwtCookieHeader,
  })
  @ApiBody({
    description: "user login credentials",
    type: LoginDto,
  })

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  public login(
    @User() user: RequestUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    /** Login is getting RequestUser/CurrentUser from ValidateLocal And passing it onto authService*/
    const token = this.authService.login(user);
    response.cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    return { token, id: user.id };
  }

  /** Get Logged In User's Profile*/
  @ApiOperation({ summary: summary.getProfile })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.userProfile })
  @Get("profile")
  public getProfile(@User() { id }: RequestUser) {
    return this.authService.getProfile(id);
  }

  @Roles(ROLE.ADMIN)
  @Patch(":id/assign-role")
  public assignRole(@Param() { id }: IdDto, @Body() { role }: RoleDto) {
    return this.authService.assignRole(id, role);
  }
}
