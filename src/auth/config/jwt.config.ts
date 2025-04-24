import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

function configFactory() {
  // const config = {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_TTL,
    },
  } as const satisfies JwtModuleOptions;
  // return config;
}

export default registerAs("jwt", configFactory);
