import Joi from "joi";

export const ENV_VALIDATION = Joi.object({
  NODE_ENV: Joi.string()
    .trim()
    .valid("development", "production", "test", "provision")
    .default("development"),
  APP_PORT: Joi.number().integer().positive().port().default(3000),
  API_VERSION: Joi.string().trim(),
  DB_PORT: Joi.number().integer().positive().port().default(5432),
  DB_HOST: Joi.string().trim().required(),
  DB_USERNAME: Joi.string().trim().required(),
  DB_PASSWORD: Joi.string().trim().required(),
  DB_DATABASE: Joi.string().trim().required(),
  DATASOURCE_URL: Joi.string().trim().required(),
  JWT_SECRET: Joi.string().trim().required(),
  JWT_TTL: Joi.string().trim().required(),
  THROTTLER_TTL: Joi.number().integer().positive().default(6000),
  THROTTLER_LIMIT: Joi.number().integer().positive().default(10),
});
