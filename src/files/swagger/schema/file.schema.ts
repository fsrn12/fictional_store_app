import { ApiFileProperty } from "../decorators/apiProperty.decorator.js";

export class FileSchema {
  @ApiFileProperty()
  file: Express.Multer.File;
}
