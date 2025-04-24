import { registerAs } from "@nestjs/config";
import { ThrottlerModuleOptions } from "@nestjs/throttler";

export default registerAs("throttler", () => {
  const options = [
    {
      ttl: parseInt(process.env.THROTTLER_TTL),
      limit: parseInt(process.env.THROTTLER_LIMIT),
    },
  ] as const satisfies ThrottlerModuleOptions;
  return options;
});
