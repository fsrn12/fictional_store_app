export type FileSizeMagnitude = "KB" | "MB" | "GB";
export type FileSize = `${number}${FileSizeMagnitude}`;
export type FileType = "png" | "jpeg" | "jpg" | "webp" | "avif" | "pdf";
export type File = Express.Multer.File;
export type FILEPATH = Record<string, Record<string, string>>;
export type PATH = Record<string, string>;
