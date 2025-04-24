import { Transform, plainToInstance } from "class-transformer";
import { FilterOperationDto } from "../dto/querying/filter-operation.dto.js";

const toFilterOperationDto = (value: string) => {
  const colonIndex = value.indexOf(":");
  if (colonIndex === -1) {
    // if ":" is not present
    const plainDto = { operator: value.trim(), operands: [] };
    return plainToInstance(FilterOperationDto, plainDto);
  }

  const operator = value.substring(0, colonIndex).trim().toLowerCase();
  const concOperands = value.substring(colonIndex + 1);
  const operandsStr = concOperands.split(",");
  const operands = operandsStr.map((operand) => +operand);

  const plainDto = { operator, operands };
  return plainToInstance(FilterOperationDto, plainDto);
};

export const ToFilterOperationDto = () =>
  Transform(({ value }) => toFilterOperationDto(value));
