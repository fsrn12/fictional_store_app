import { User } from "@/domain/users/entities/user.entity.js";
import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
import jwtConfig from "./config/jwt.config.js";
import throttleConfig from "./config/throttle.config.js";
import { LoginDto } from "./dto/login.dto.js";
import { JwtAuthGuard } from "./guards/jwt-auth.guard.js";
import { RolesGuard } from "./guards/roles.guard.js";
import { BcryptProvider } from "./hashing/bcrypt.provider.js";
import { HashingProvider } from "./hashing/hashing.provider.js";
import { ValidationMiddleware } from "./middleware/validation/validation.middleware.js";
import { JwtStrategy } from "./strategies/jwt.strategy.js";
import { LocalStrategy } from "./strategies/local.strategy.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ThrottlerModule.forRootAsync(throttleConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    { provide: HashingProvider, useClass: BcryptProvider },
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService, HashingProvider],
})
// export class AuthModule {}
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidationMiddleware(LoginDto)).forRoutes("auth/login");
  }
}
