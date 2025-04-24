import { applyDecorators } from "@nestjs/common";
import { IsNumber, IsPositive, ValidationOptions } from "class-validator";

/**
 * Checks if the value is a positive number greater than zero.
 * with at most 2 decimal places i.e 14.99
 * @param validationOptions
 */
export const IsCurrency = function (
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    IsNumber({ maxDecimalPlaces: 2 }, validationOptions),
    IsPositive(validationOptions),
  );
};
