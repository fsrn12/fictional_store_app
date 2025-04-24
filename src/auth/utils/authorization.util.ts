import { ForbiddenException } from "@nestjs/common";

export const isCurrentUser = function (userId: number, requiredUserId: number) {
  if (userId !== requiredUserId) {
    throw new ForbiddenException("Forbidden resource");
  }
};
