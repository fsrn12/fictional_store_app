import { ValidationOptions } from "class-validator";
import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";
import { ONLY_REQUIRED_CHARACTERS_PATTERN } from "./pattern-constants.js";
import { getValidation } from "./validation.decorator.js";

export const OnlyRequiredChars = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  getValidation(
    KEY.ONLY_REQUIRED_CHARS,
    MESSAGE.ONLY_ALLOWED,
    ONLY_REQUIRED_CHARACTERS_PATTERN,
    validationOptions,
  );
