import { HttpStatus } from "@nestjs/common";
import { extractFileType, extractMaxSize } from "./helpers.util.js";

export const HttpError = {
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    error: "Not Found",
  },
  PAYLOAD_TOO_LARGE: {
    status: HttpStatus.PAYLOAD_TOO_LARGE,
    error: "Payload Too Large",
  },
  UNSUPPORTED_MEDIA_TYPE: {
    status: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    error: "Unsupported Media Type",
  },
  BAD_REQUEST: {
    status: HttpStatus.BAD_REQUEST,
    error: "Bad Request",
  },
  CONFLICT: {
    status: HttpStatus.CONFLICT,
    error: "Conflict",
  },
} as const satisfies Record<string, IHttpError>;

export interface IHttpError {
  readonly status: HttpStatus;
  readonly error: string;
}

export type HttpError = (typeof HttpError)[keyof typeof HttpError];

export const errorDataSnippets = {
  MAX_SIZE: "expected size",
  FILE_TYPE: "expected type",
  FILE_SIGNATURE: "does not match",
  ASSOCIATION_NOT_FOUND: " is not present",
  NOT_NULL_VIOLATION: " is still referenced",
  UNIQUE_VIOLATION: " is not unique",
} as const satisfies Record<string, string>;

export const errorDescription = {
  ASSOCIATION_NOT_FOUND: "Associated Entity not found",
  NOT_NULL_VIOLATION: "Cannot delete due to NOT NULL Constraint",
  UNIQUE_VIOLATION: "Unique constraint violation",
  FILE_TYPE: "Invalid file type",
  FILE_SIGNATURE: "FIle type tempered",
} as const satisfies Record<string, string>;
