import { DatabaseExceptionFilter } from "@/common/exception-filters/db-exception.filter.js";
import { NotFoundExceptionFilter } from "@/common/exception-filters/not-found-exception.filter.js";
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import databaseConfig from "./config/database.config.js";
import { SeedingModule } from "./seeding/seeding.module.js";

@Module({
  imports: [
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    SeedingModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
  ],
})
export class DatabaseModule {}
