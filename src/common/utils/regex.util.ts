export const regEx = {
  MAX_FILE_SIZE: /(?<=less than )\d+/,
  FILE_TYPES: /(?<=\/).*(?=\/)/,
  FIELD_NAME: /(?<=Key \()\w+/,
  FIELD_VALUE: /(?<=\)=\().*?(?=\))/,
  ENTITY_NAME: /(?<=type\s")\w+/,
} as const satisfies Record<string, RegExp>;
