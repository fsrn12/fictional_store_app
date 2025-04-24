import { ValidationOptions } from "class-validator";
import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";
import { ALPHA_WITH_SPACES_PATTERN } from "./pattern-constants.js";
import { getValidation } from "./validation.decorator.js";

export const ContainsLowercaseLetters = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  getValidation(
    KEY.ALPHA_WITH_SPACE,
    MESSAGE.ALPHA,
    ALPHA_WITH_SPACES_PATTERN,
    validationOptions,
  );
