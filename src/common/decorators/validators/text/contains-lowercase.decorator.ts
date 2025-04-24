import { ValidateByOptions, ValidationOptions } from "class-validator";
import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";
import { LOWERCASE_PATTERN } from "./pattern-constants.js";
import { getValidation } from "./validation.decorator.js";

export const ContainsLowercaseLetters = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  getValidation(
    KEY.LOWERCASE,
    MESSAGE.LOWER,
    LOWERCASE_PATTERN,
    validationOptions,
  );
