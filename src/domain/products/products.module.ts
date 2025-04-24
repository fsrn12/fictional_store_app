import { FilesModule } from "@/files/files.module.js";
import { QueryingModule } from "@/querying/querying.module.js";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity.js";
import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";
import { ProductsSubscriber } from "./subscribers/products.subscriber.js";

@Module({
  imports: [TypeOrmModule.forFeature([Product]), QueryingModule, FilesModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsSubscriber],
  exports: [ProductsService],
})
export class ProductsModule {}
