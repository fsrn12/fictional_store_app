import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class BodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    try {
      const body = JSON.parse(request.body.data);
      request.body = body;
    } catch (error) {
      console.error(error);

      if (error instanceof SyntaxError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }

    return next.handle();
  }
}
