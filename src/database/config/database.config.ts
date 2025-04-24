import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function configFactory() {
  const config = {
    type: "postgres",
    url: process.env.DATASOURCE_URL,
    synchronize: process.env.DB_SYNC === "true" ? true : false,
    autoLoadEntities: process.env.ENTITIES_AUTOLOAD === "true" ? true : false,
  } as const satisfies TypeOrmModuleOptions;
  return config;
}

export default registerAs("databaseConfig", configFactory);
