import { IdDto } from "@/common/dtos/id.dto.js";
import { Controller, Param, Post } from "@nestjs/common";

import { User } from "@/auth/decorators/user.decorator.js";
import { idParamOptions } from "@/querying/util/query-options.util.js";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import type { RequestUser } from "../../auth/interfaces/request-user.interface.js";
import { PaymentsService } from "./payments.service.js";

@ApiTags("Payments")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  /** Payment for the order */
  @ApiOperation({ summary: "To make payment for the order" })
  @ApiResponse({ status: 201, description: "payment made successfully" })
  @ApiParam(idParamOptions)
  @Post(":id")
  payOrder(@Param() { id }: IdDto, @User() user: RequestUser) {
    return this.paymentsService.payOrder(id, user);
  }
}
