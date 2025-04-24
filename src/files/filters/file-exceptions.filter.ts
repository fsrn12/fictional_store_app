import {
  extractFileType,
  extractMaxSize,
  extractText,
} from "@/common/utils/helpers.util.js";
import {
  HttpError,
  errorDataSnippets,
  errorDescription,
} from "@/common/utils/http-error.util.js";
import { regEx } from "@/common/utils/regex.util.js";

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from "@nestjs/common";

import { Response } from "express";

@Catch(UnprocessableEntityException)
export class FileExceptionsFilter implements ExceptionFilter {
  catch(exception: UnprocessableEntityException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    // let { message } = exception.getResponse() as Record<string, string>;
    let { message } = exception;
    const { httpError, ...meta } = this.createErrorData(message);

    const { status, error } = httpError;
    response.status(status).json({
      statusCode: status,
      message,
      error,
      meta,
    });
  }

  private createErrorData(msg: string) {
    let httpError: HttpError;
    let description: string;
    let maxSize: string;
    let expectedFileTypes: (string | false)[];

    switch (true) {
      case msg.includes(errorDataSnippets.MAX_SIZE): {
        httpError = HttpError.PAYLOAD_TOO_LARGE;
        maxSize = extractMaxSize(msg);
        break;
      }
      case msg.includes(errorDataSnippets.FILE_TYPE): {
        httpError = HttpError.UNSUPPORTED_MEDIA_TYPE;
        description = errorDescription.FILE_TYPE;
        expectedFileTypes = extractFileType(msg);
        break;
      }
      default:
        httpError = HttpError.BAD_REQUEST;
    }
    return { httpError, description, maxSize, expectedFileTypes };
  }
}
