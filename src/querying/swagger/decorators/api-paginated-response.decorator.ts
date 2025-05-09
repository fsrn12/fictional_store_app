import { Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PaginationMeta } from "../schemas/pagination-meta.schema.js";
export const ApiPaginatedResponse = <TModel extends Type>(
  model: TModel,
): PropertyDecorator =>
  applyDecorators(
    ApiExtraModels(
      PaginationMeta,
      ApiOkResponse({
        schema: {
          title: `PaginatedResponseOf${model.name}`,
          properties: {
            data: {
              type: "array",
              items: { $ref: getSchemaPath(model) },
            },
            meta: { $ref: getSchemaPath(PaginationMeta) },
          },
        },
      }),
    ),
  );
