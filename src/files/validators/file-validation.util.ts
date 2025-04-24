import {
  FileTypeValidator,
  FileValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
} from "@nestjs/common";
import bytes from "bytes";
import { lookup } from "mime-types";

import { NonEmptyArray } from "@/common/utils/array.util.js";
import { FileSize, FileType } from "../types/file.types.js";
import { FileSignatureValidator } from "./file-signature.validator.js";
import { createFileTypeRegex } from "@/common/utils/helpers.util.js";

export const createFileValidators = function (
  maxSize: FileSize,
  fileTypes: FileType[],
): FileValidator[] {
  const fileTypeRegex = createFileTypeRegex(fileTypes);
  return [
    new MaxFileSizeValidator({ maxSize: bytes(maxSize) }),
    new FileSignatureValidator(),
    new FileTypeValidator({ fileType: fileTypeRegex }),
  ];
};

export const createParseFilePipe = function (
  maxSize: FileSize,
  ...fileTypes: NonEmptyArray<FileType>
) {
  return new ParseFilePipe({
    validators: createFileValidators(maxSize, fileTypes),
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  });
};
