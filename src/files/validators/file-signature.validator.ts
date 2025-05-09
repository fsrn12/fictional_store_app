import { FileValidator } from "@nestjs/common";
import * as magicBytes from "magic-bytes.js";
import { File } from "../types/file.types.js";

export class FileSignatureValidator extends FileValidator {
  constructor() {
    super({});
  }
  buildErrorMessage(): string {
    return "Validation failed (file type does not match file signature)";
  }

  isValid(file: File) {
    const fileSignatures = magicBytes
      .filetypeinfo(file.buffer)
      .map((file) => file.mime);
    if (!fileSignatures.length) return false;

    const isMatch = fileSignatures.includes(file.mimetype);
    if (!isMatch) return false;
    return true;
  }
}
