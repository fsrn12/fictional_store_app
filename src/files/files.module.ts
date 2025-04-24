import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { FilesService } from "./files.service.js";
import { FileExceptionsFilter } from "./filters/file-exceptions.filter.js";
import { FseProvider } from "./storage/fse.provider.js";
import { StorageProvider } from "./storage/storage.provider.js";

@Module({
  providers: [
    FilesService,
    { provide: StorageProvider, useClass: FseProvider },
    { provide: APP_FILTER, useClass: FileExceptionsFilter },
  ],
  exports: [StorageProvider, FilesService],
})
export class FilesModule {}
