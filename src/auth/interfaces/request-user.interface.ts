import type { ROLE } from "../roles/enums/role.enum.js";

export interface RequestUser {
  readonly id: number;
  readonly email?: string;
  readonly role?: ROLE;
}
