import { AuthModule } from "@/auth/auth.module.js";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersModule } from "../orders/orders.module.js";
import { Payment } from "./entities/payment.entity.js";
import { PaymentsController } from "./payments.controller.js";
import { PaymentsService } from "./payments.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), OrdersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
