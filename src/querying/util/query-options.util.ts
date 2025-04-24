export const idParamOptions = {
  name: "id",
  type: "number",
  required: true,
  description: "a positive integer value",
  example: 1,
};

export const limitQueryOptions = {
  name: "limit",
  type: "number",
  required: false,
  description: "number of results per query",
  example: 4,
};

export const offsetQueryOptions = {
  name: "offset",
  type: "number",
  required: false,
  description: "number of pages to skip or position of the page",
  example: 10,
};
export const sortQueryOptions = {
  name: "sort",
  type: "number",
  description: "sort results in Ascending or Descending order",
  default: "name",
};
