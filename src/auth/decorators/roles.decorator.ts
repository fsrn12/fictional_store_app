import { NonEmptyArray } from "@/common/utils/array.util.js";
import { SetMetadata } from "@nestjs/common";
import { ROLE } from "../roles/enums/role.enum.js";

export const ROLES_KEY = "roles";
export const Roles = (...roles: NonEmptyArray<ROLE>) =>
  SetMetadata(ROLES_KEY, roles);
