import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { MulterModule } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { AuthModule } from "./auth/auth.module.js";
import { CommonModule } from "./common/common.module.js";
import { DataResponseInterceptor } from "./common/interceptors/data-response.interceptor.js";
import { DatabaseModule } from "./database/database.module.js";
import { CategoriesModule } from "./domain/categories/categories.module.js";
import { OrdersModule } from "./domain/orders/orders.module.js";
import { PaymentsModule } from "./domain/payments/payments.module.js";
import { ProductsModule } from "./domain/products/products.module.js";
import { UsersModule } from "./domain/users/users.module.js";
import { EnvModule } from "./env/env.module.js";
import { FilesModule } from "./files/files.module.js";
import { PaginationService } from "./querying/pagination.service.js";
import { QueryingModule } from "./querying/querying.module.js";

@Module({
  imports: [
    UsersModule,
    CommonModule,
    DatabaseModule,
    EnvModule,
    OrdersModule,
    ProductsModule,
    PaymentsModule,
    CategoriesModule,
    QueryingModule,
    AuthModule,
    FilesModule,
    MulterModule.register({ storage: memoryStorage() }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
  ],
})
export class AppModule {}
