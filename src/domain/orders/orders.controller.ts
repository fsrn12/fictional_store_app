import { Public } from "@/auth/decorators/public.decorator.js";
import { Roles } from "@/auth/decorators/roles.decorator.js";
import { ROLE } from "@/auth/roles/enums/role.enum.js";
import { summary } from "@/common/templates/api-operation.template.js";
import { responseMsg } from "@/common/templates/response-messages.template.js";
import { PaginationDto } from "@/querying/dto/pagination.dto.js";
import { ApiPaginatedResponse } from "@/querying/swagger/decorators/api-paginated-response.decorator.js";
import {
  idParamOptions,
  limitQueryOptions,
  offsetQueryOptions,
  sortQueryOptions,
} from "@/querying/util/query-options.util.js";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { IdDto } from "common/dtos/id.dto.js";
import { CreateOrderDto } from "./dto/create-order.dto.js";
import { Order } from "./entities/order.entity.js";
import { OrdersService } from "./orders.service.js";

@ApiTags("Orders")
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /** Create new order */
  @ApiOperation({ summary: summary.createOrder })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Order created successfully",
  })
  @ApiBody({ type: CreateOrderDto })
  @Public()
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  /** Get all orders */
  @ApiOperation({ summary: summary.findOrders })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.ordersFound })
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @ApiPaginatedResponse(Order)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersService.findAll(paginationDto);
  }

  /** Get an order with id */
  @ApiOperation({ summary: summary.findOrder })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.orderFound })
  @ApiParam(idParamOptions)
  @Get(":id")
  findOne(@Param() { id }: IdDto) {
    return this.ordersService.findOne(id);
  }

  /** Delete an order with id */
  @ApiOperation({ summary: summary.deleteOrder })
  @ApiResponse({ status: HttpStatus.OK, description: responseMsg.orderDeleted })
  @Roles(ROLE.MANAGER, ROLE.ADMIN)
  @ApiParam(idParamOptions)
  @Delete(":id")
  remove(@Param() { id }: IdDto) {
    return this.ordersService.remove(id);
  }
}
