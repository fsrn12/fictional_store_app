import { Injectable, StreamableFile } from "@nestjs/common";

@Injectable()
export abstract class StorageProvider {
  public async saveFile(
    path: string,
    file: Express.Multer.File,
  ): Promise<void> {}
  abstract fullPath(path: string): string;
  abstract createDir(path: string): Promise<void>;
  abstract getFile(path: string): StreamableFile;
  abstract getDirFileNames(path: string): Promise<string[]>;
  abstract getDirFileCount(path: string): Promise<number>;
  abstract delete(path: string): Promise<void>;
  abstract validatePath(path: string): Promise<void>;
  abstract validateFileCount(count: number, max: number): void;
  abstract genUniqueFileName(filename: string): string;
}
