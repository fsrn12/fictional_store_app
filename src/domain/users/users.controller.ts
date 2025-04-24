import { Public } from "@/auth/decorators/public.decorator.js";
import { Roles } from "@/auth/decorators/roles.decorator.js";
import { User as CurrentUser } from "@/auth/decorators/user.decorator.js";
import { LoginDto } from "@/auth/dto/login.dto.js";
import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { IdDto } from "@/common/dtos/id.dto.js";
import { RemoveDto } from "@/common/dtos/remove.dto.js";
import { summary } from "@/common/templates/api-operation.template.js";
import { responseMsg } from "@/common/templates/response-messages.template.js";
import { PaginationDto } from "@/querying/dto/pagination.dto.js";
import { ApiPaginatedResponse } from "@/querying/swagger/decorators/api-paginated-response.decorator.js";
import { idParamOptions } from "@/querying/util/query-options.util.js";
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import type { RequestUser } from "../../auth/interfaces/request-user.interface.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { User } from "./entities/user.entity.js";
import { UsersService } from "./users.service.js";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** New User Signup Route */
  @ApiOperation({ summary: summary.createUser })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.userCreated })
  @ApiBody({ type: CreateUserDto })
  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("signup")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /** Find all users */
  @ApiOperation({ summary: summary.findUsers })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.usersFound })
  @ApiPaginatedResponse(User)
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  /**  Recover a deleted user*/
  @ApiOperation({ summary: summary.recoverUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.userRecovered,
  })
  @ApiBody({
    description: "user login credentials",
    type: LoginDto,
  })
  @Public()
  @Patch("recover")
  recover(@Body() loginDto: LoginDto) {
    return this.usersService.recover(loginDto);
  }

  /** Find a user by userId */
  @ApiOperation({ summary: summary.findUser })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.userFound })
  @ApiParam(idParamOptions)
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @Get(":id")
  findOne(@Param() { id }: IdDto) {
    return this.usersService.findOne(id);
  }

  /** Update user by userId */
  @ApiOperation({ summary: summary.updateUser })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.userUpdated })
  @ApiParam(idParamOptions)
  @ApiBody({ type: UpdateUserDto })
  @Patch(":id")
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param() { id }: IdDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  /** Delete a user with id */
  @ApiOperation({ summary: summary.deleteUser })
  @ApiResponse({
    status: HttpStatus.OK,
    description: responseMsg.userDeleted,
  })
  @ApiParam(idParamOptions)
  @Delete(":id")
  public async remove(
    @Param() { id }: IdDto,
    @Query() { soft }: RemoveDto,
    @CurrentUser() user: RequestUser,
  ) {
    let result = await this.usersService.remove(id, user, soft);
    return {
      userId: result.id,
      deleted: true,
      deleteCount: 1,
      deletedAt: result.registryDates.deletedAt,
    };
  }
}
