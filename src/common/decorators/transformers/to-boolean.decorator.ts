import { Transform } from "class-transformer";

const toBoolean = (value: unknown) => {
  switch (value) {
    case null:
      return "Failure";

    case "false":
      return false;

    case "true":
      return true;

    default:
      return value;
  }
};
export const ToBoolean = () => Transform(({ obj, key }) => toBoolean(obj[key]));
