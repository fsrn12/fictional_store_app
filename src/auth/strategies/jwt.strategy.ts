import { Inject, Injectable } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service.js";
import jwtConfig from "../config/jwt.config.js";
import { JwtPayload } from "../interfaces/jwt-payload.interface.js";
import { RequestUser } from "../interfaces/request-user.interface.js";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<RequestUser> {
    return await this.authService.validateJwt(payload);
  }
}
