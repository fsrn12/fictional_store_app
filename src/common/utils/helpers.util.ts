import { FileType } from "@/files/types/file.types.js";
import bytes from "bytes";
import { extension, lookup } from "mime-types";
import { regEx } from "./regex.util.js";

export const extractText = (text: string, regex: RegExp): string =>
  text.match(regex)[0];

export function extractMaxSize(msg: string) {
  const maxSizeStr = extractText(msg, regEx.MAX_FILE_SIZE);
  const maxSizeInBytes = +maxSizeStr;
  const maxSize = bytes(maxSizeInBytes);
  return maxSize;
}

/** creates REGEX for the given file types*/
export function createFileTypeRegex(fileTypes: FileType[]) {
  const mediaTypes = fileTypes.map((type) => lookup(type));
  return new RegExp(mediaTypes.join("|"));
}

/** Extract file types of given filenames*/
export function extractFileType(msg: string) {
  const mediaTypeStr = extractText(msg, regEx.FILE_TYPES);
  const mediaTypesWithBackslashes = mediaTypeStr.split("|");
  const mediaTypes = mediaTypesWithBackslashes.map((type) =>
    type.replace("\\", ""),
  );
  const fileTypes = mediaTypes.map((type) => extension(type));
  return fileTypes;
}
