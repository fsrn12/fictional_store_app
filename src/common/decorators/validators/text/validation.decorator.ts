import {
  ValidateBy,
  ValidationOptions,
  buildMessage,
  matches,
} from "class-validator";

import { KEY } from "./enums/key.enum.js";
import { MESSAGE } from "./enums/messages.enum.js";

export const getValidation = (
  key: KEY,
  msg: MESSAGE,
  regex: RegExp,
  validationOptions?: ValidationOptions,
): PropertyDecorator => {
  return ValidateBy(
    {
      name: key,
      validator: {
        validate: (value): boolean => matches(value, regex),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must contain ${msg}`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
};
