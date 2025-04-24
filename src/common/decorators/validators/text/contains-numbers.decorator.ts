import { ValidationOptions } from "class-validator";
import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";
import { NUMBER_PATTERN } from "./pattern-constants.js";
import { getValidation } from "./validation.decorator.js";

export const ContainsNumbers = (
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  getValidation(KEY.NUMBER, MESSAGE.NUMBER, NUMBER_PATTERN, validationOptions);
