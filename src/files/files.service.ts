import { join } from "node:path";
import { Injectable } from "@nestjs/common";
import fse from "fs-extra";
import { StorageProvider } from "./storage/storage.provider.js";
import { FILEPATH, PATH } from "./types/file.types.js";
import {
  FilePath,
  MAX_FILE_COUNT,
  UPLOAD_BASE_PATH,
} from "./utils/file.constant.js";

@Injectable()
export class FilesService {
  constructor(private readonly storageProvider: StorageProvider) {}
  /** File Upload */
  public async uploadFile(
    id: number,
    files: Express.Multer.File[],
    filePathBase: string,
    fileType: string,
    limit: number,
  ) {
    const path = join(filePathBase, id.toString(), fileType);

    if (await fse.pathExists(join(UPLOAD_BASE_PATH, path))) {
      const incomingFilesCount = files.length;
      const dirFileCount = await this.storageProvider.getDirFileCount(path);
      const totalFileCount = incomingFilesCount + dirFileCount;
      this.storageProvider.validateFileCount(totalFileCount, limit);
    }

    await this.storageProvider.createDir(path);
    await Promise.all(
      files.map((file) => this.storageProvider.saveFile(path, file)),
    );
  }

  /** File Download */
  public async downloadFile(
    id: number,
    filename: string,
    filePathBase: string,
    fileType: string,
  ) {
    const path = join(filePathBase, id.toString(), fileType, filename);
    await this.storageProvider.validatePath(path);
    return this.storageProvider.getFile(path);
  }

  /** File Deletion */
  public async deleteFile(
    id: number,
    filename: string,
    filePathBase: string,
    fileType: string,
  ) {
    const path = join(filePathBase, id.toString(), fileType, filename);
    await this.storageProvider.validatePath(path);
    return this.storageProvider.delete(path);
  }

  public async deleteDir(id: number, filePathBase: string) {
    const path = join(filePathBase, id.toString());
    await this.storageProvider.delete(path);
  }
}
