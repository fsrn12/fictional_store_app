import { applyDecorators } from "@nestjs/common";
import { ValidationOptions } from "class-validator";
import { IsBoolean as DefaultIsBoolean } from "class-validator";
import { ToBoolean } from "../transformers/to-boolean.decorator.js";

/**
 * Checks if the value is a boolean. Works with query params.
 */
// export const IsBoolean = function IsBoolean(
export function IsBoolean(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(DefaultIsBoolean(validationOptions), ToBoolean());
}
