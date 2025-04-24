import { QueryingModule } from "@/querying/querying.module.js";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../products/entities/product.entity.js";
import { ProductsModule } from "../products/products.module.js";
import { OrderItem } from "./entities/order-item.entity.js";
import { Order } from "./entities/order.entity.js";
import { OrdersController } from "./orders.controller.js";
import { OrdersService } from "./orders.service.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    ProductsModule,
    QueryingModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
