import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { ROLES_KEY } from "../decorators/roles.decorator.js";
import { RequestUser } from "../interfaces/request-user.interface.js";
import { ROLE } from "../roles/enums/role.enum.js";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // if no authorization required, grant instant access
    if (!requiredRoles) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as RequestUser;
    // if user is Admin, grant instant access
    if (user.role === ROLE.ADMIN) return true;
    // if requiredRoles, than check role against user.roles
    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);
    return hasRequiredRoles;
  }
}
