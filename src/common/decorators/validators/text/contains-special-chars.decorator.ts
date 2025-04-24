import { ValidationOptions } from "class-validator";
import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";
import { SPECIAL_CHARACTER_PATTERN } from "./pattern-constants.js";
import { getValidation } from "./validation.decorator.js";

export const ContainsSpecialChars = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  getValidation(
    KEY.SPECIAL_CHAR,
    MESSAGE.SPECIAL,
    SPECIAL_CHARACTER_PATTERN,
    validationOptions,
  );
