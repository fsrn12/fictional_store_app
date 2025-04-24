import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError } from "typeorm";
import { extractText } from "../utils/helpers.util.js";
import { HttpError } from "../utils/http-error.util.js";
import { regEx } from "../utils/regex.util.js";

@Catch(EntityNotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const { status, error } = HttpError.NOT_FOUND;

    const entityName = extractText(exception.message, regEx.ENTITY_NAME);
    const message = `${entityName} not found`;
    const response = host.switchToHttp().getResponse<Response>();
    response.status(status).json({
      statusCode: status,
      message,
      error,
    });
  }
}
