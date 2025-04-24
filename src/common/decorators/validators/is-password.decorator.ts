import { applyDecorators } from "@nestjs/common";
import { Length, ValidationOptions } from "class-validator";
import { ContainsLowercaseLetters } from "./text/contains-lowercase.decorator.js";
import { ContainsNumbers } from "./text/contains-numbers.decorator.js";
import { ContainsSpecialChars } from "./text/contains-special-chars.decorator.js";
import { ContainsUppercaseLetters } from "./text/contains-uppercase.decorator.js";
import { OnlyRequiredChars } from "./text/only-required-characters.decorator.js";

/**
 * Checks if value is string following these rules;
 * Length is minimum 8 and maximum 32 characters
 * Contains at least 1
 * - Lowercase letter
 * - Uppercase letter
 * - Number between 0 to 9
 * - Special character from @$!%*#?&-+
 */
export function IsPassword(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return applyDecorators(
    ContainsLowercaseLetters(validationOptions),
    ContainsUppercaseLetters(validationOptions),
    ContainsSpecialChars(validationOptions),
    ContainsNumbers(validationOptions),
    OnlyRequiredChars(validationOptions),
    Length(8, 32, validationOptions),
  );
}

// const PASSWORD_REGEX =
//   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-+])[A-Za-z\d@$!%*#?&-+]{8,32}$/;
// const PASSWORD_MSG =
//   "Password must be atleast 8 characters long. Must have atleast 1 Capital letter, 1 small letter, 1 Number and 1 special characters from '@$!&*#?&'";
