import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from "@nestjs/common";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { VALIDATION_PIPE_OPTIONS } from "./utils/common.constants.js";

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(VALIDATION_PIPE_OPTIONS),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class CommonModule {}
