import { ValidationOptions } from "class-validator";
import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";
import { UPPERCASE_PATTERN } from "./pattern-constants.js";
import { getValidation } from "./validation.decorator.js";

export const ContainsUppercaseLetters = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  getValidation(
    KEY.UPPERCASE,
    MESSAGE.UPPER,
    UPPERCASE_PATTERN,
    validationOptions,
  );
