import { ApiProperty } from "@nestjs/swagger";

export const ApiFileProperty = (): PropertyDecorator =>
  ApiProperty({ type: "string", format: "binary" });

export const ApiFilesProperty = (): PropertyDecorator =>
  ApiProperty({ type: "array", items: { type: "string", format: "binary" } });
