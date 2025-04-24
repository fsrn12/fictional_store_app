import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
import { DataSource } from "typeorm";

dotenvExpand.expand(dotenv.config());

const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const name = process.env.DB_DATABASE;
const url = `postgresql://${user}:${password}@${host}:${port}/${name}`;

export default new DataSource({
  type: "postgres" as "postgres",
  url,
  entities: ["dist/domain/**/*.entity.js"],
  migrations: ["dist/database/migrations/*.js"],
});
