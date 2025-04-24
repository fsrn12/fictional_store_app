import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";
import { DatabaseError } from "../interfaces/db-error.interfaces.js";
import {
  HttpError,
  errorDataSnippets,
  errorDescription,
} from "../utils/http-error.util.js";
import { regEx } from "../utils/regex.util.js";

@Catch(QueryFailedError)
export class DatabaseExceptionFilter extends BaseExceptionFilter {
  catch(exception: DatabaseError, host: ArgumentsHost) {
    const { code, detail, table } = exception;
    const { httpError, description } = this.createErrorData(code, detail);
    if (!httpError) {
      return super.catch(exception, host);
    }
    const { status, error } = httpError;

    const fieldName = detail.match(regEx.FIELD_NAME)[0];
    const fieldValue = detail.match(regEx.FIELD_VALUE)[0];
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const path = ctx.getRequest<Request>().url;
    response.status(status).json({
      statusCode: status,
      message: detail,
      error,
      meta: {
        description,
        table,
        fieldName,
        fieldValue,
        path,
      },
    });
  }

  // Database Error Codes
  private readonly DatabaseErrorCode = {
    ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION: "23503",
    UNIQUE_VIOLATION: "23505",
  } as const satisfies Record<string, string>;

  // Create Error Data from Database Error Code and Error Detail
  private createErrorData(code: string, msg: string) {
    let httpError: HttpError;
    let description: string;

    switch (code) {
      case this.DatabaseErrorCode.ASSOCIATION_NOT_FOUND_OR_NOT_NULL_VIOLATION:
        switch (true) {
          case msg.includes(errorDataSnippets.ASSOCIATION_NOT_FOUND):
            httpError = HttpError.NOT_FOUND;
            description = errorDescription.ASSOCIATION_NOT_FOUND;
            break;

          case msg.includes(errorDataSnippets.NOT_NULL_VIOLATION):
            httpError = HttpError.CONFLICT;
            description = errorDescription.NOT_NULL_VIOLATION;
            break;
        }
        break;

      case this.DatabaseErrorCode.UNIQUE_VIOLATION:
        httpError = HttpError.CONFLICT;
        description = errorDescription.UNIQUE_VIOLATION;
        break;
    }
    return { httpError, description };
  }
}
