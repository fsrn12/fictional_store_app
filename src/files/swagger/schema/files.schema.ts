import { ApiFilesProperty } from "../decorators/apiProperty.decorator.js";

export class FilesSchema {
  @ApiFilesProperty()
  files: Express.Multer.File[];
}
