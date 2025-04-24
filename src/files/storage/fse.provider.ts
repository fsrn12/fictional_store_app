import { randomUUID } from "node:crypto";
import { join } from "node:path";
import {
  ConflictException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from "@nestjs/common";
import fse from "fs-extra";
import sharp from "sharp";
import { UPLOAD_BASE_PATH } from "../utils/file.constant.js";
import { StorageProvider } from "./storage.provider.js";

@Injectable()
export class FseProvider implements StorageProvider {
  public fullPath(path: string) {
    return join(UPLOAD_BASE_PATH, path);
  }

  /** Save/Upload */
  public async saveFile(
    path: string,
    file: Express.Multer.File,
  ): Promise<void> {
    const filename = this.genUniqueFileName(file.originalname);
    const fullPath = join(this.fullPath(path), filename);

    let processedBuffer = await sharp(file.buffer)
      .resize(400, 400)
      .toFormat("webp")
      .webp({ quality: 70, effort: 2 })
      .toBuffer();

    await fse.writeFile(fullPath, processedBuffer);
  }

  /** Create a directory */
  public async createDir(path: string): Promise<void> {
    await fse.mkdirp(this.fullPath(path));
  }

  /** Get/download file */
  public getFile(path: string): StreamableFile {
    const stream = fse.createReadStream(this.fullPath(path));
    return new StreamableFile(stream);
  }

  /** Get names of files in the given directory */
  public getDirFileNames(path: string): Promise<string[]> {
    return fse.readdir(this.fullPath(path));
  }

  /** Get number of files in directory */
  public async getDirFileCount(path: string): Promise<number> {
    const dirFileNames = await this.getDirFileNames(path);
    return dirFileNames.length;
  }

  /** Delete file */
  public async delete(path: string): Promise<void> {
    return fse.remove(this.fullPath(path));
  }

  /** Validate directory/file path */
  public async validatePath(path: string): Promise<void> {
    if (!(await fse.pathExists(this.fullPath(path)))) {
      throw new NotFoundException("path not found");
    }
  }

  /** Validate if files in directory are within limit */
  validateFileCount(count: number, max: number): void {
    if (count > max) {
      throw new ConflictException("number of files exceed maximum limit");
    }
  }

  /** Generate unique file names */
  genUniqueFileName(filename: string): string {
    // const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    return `${randomUUID()}-${filename.split(".")[0]}.webp`;
  }
}
