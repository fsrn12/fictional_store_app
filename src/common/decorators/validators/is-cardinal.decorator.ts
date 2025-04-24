import { applyDecorators } from "@nestjs/common";
import { IsInt, IsPositive, ValidationOptions } from "class-validator";

/**
 * Checks if the value is a positive number greater than zero
 * @param (Optional) validationOptions
 */
export const IsCardinal = function IsCardinal(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    IsInt(validationOptions),
    IsPositive(validationOptions),
  );
};
