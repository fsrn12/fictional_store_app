import { HeadersObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface.js";

export const JwtCookieHeader: HeadersObject = {
  "Set-Cookie": { description: "JWT cookie", schema: { type: "string" } },
};
// ApiResponseOptions["headers"]
