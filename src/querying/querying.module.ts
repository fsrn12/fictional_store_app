import { Module } from "@nestjs/common";
import { FilteringService } from "./filter.service.js";
import { PaginationService } from "./pagination.service.js";

@Module({
  providers: [PaginationService, FilteringService],
  exports: [PaginationService, FilteringService],
})
export class QueryingModule {}
