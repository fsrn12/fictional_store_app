import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import appConfig from "./app.config.js";
import { ENV_VALIDATION } from "./env-validation.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      load: [appConfig],
      validationSchema: ENV_VALIDATION,
    }),
  ],
})
export class EnvModule {}

// const ENV = process.env.NODE_ENV;

// isGlobal: true,
// envFilePath: !ENV ? ".env" : `.env.${ENV}`,
// load: [appEnvConfig, dbEnvConfig],
