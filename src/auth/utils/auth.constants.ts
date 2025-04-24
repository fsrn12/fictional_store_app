import { ThrottlerModuleOptions } from "@nestjs/throttler";

export const TIME_TO_LIVE: number = 60;
export const RATE_LIMIT: number = 10;
export const THROTTLE_MODULE_OPTIONS: ThrottlerModuleOptions = [
  {
    ttl: TIME_TO_LIVE,
    limit: RATE_LIMIT,
  },
];
