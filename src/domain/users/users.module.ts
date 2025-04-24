import { AuthModule } from "@/auth/auth.module.js";
import { QueryingModule } from "@/querying/querying.module.js";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity.js";
import { UserSubscriber } from "./subscribers/users.subscribers.js";
import { UsersController } from "./users.controller.js";
import { UsersService } from "./users.service.js";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule, QueryingModule],
  exports: [UsersService],
  providers: [UsersService, UserSubscriber],
  controllers: [UsersController],
})
export class UsersModule {}
