import { FILEPATH } from "../types/file.types.js";

export const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = /png|jpg|jpeg|webp/;
export const MULTIPART_FORMDATA_KEY = "multipart/form-data";
export const UPLOAD_BASE_PATH = "upload";
export const MAX_FILE_COUNT = {
  PRODUCT_IMAGES: 5,
} as const satisfies Record<string, number>;
export const FilePath = {
  Products: {
    BASE: "product",
    IMAGES: "images",
  },
} as const satisfies FILEPATH;
