import { Injectable } from "@nestjs/common";
import { PaginationMeta } from "./swagger/schemas/pagination-meta.schema.js";

@Injectable()
export class PaginationService {
  public calculateOffset(limit: number, page: number) {
    /** if Limit = 2, Page = 3 than Offset = (Page - 1) * Limit, i.e Offset = (3=1) * 2 = 4*/
    return (page - 1) * limit;
  }

  public createMeta(
    limit: number,
    page: number,
    count: number,
  ): PaginationMeta {
    /** if Limit = 4, Count = 20 than totalPages = Count/Limit= 20/4 = 5 */
    const totalPages = Math.ceil(count / limit);
    if (page > totalPages) return;

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      itemsPerPage: limit,
      totalItems: count,
      currentPage: page,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }
}
