import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(map((data) => this.removePasswordField(data)));
  }

  private removePasswordField(data: any): any {
    if (data == null) {
      return data;
    }

    if (typeof data !== 'object' || data instanceof Date) {
      return data;
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.removePasswordField(item));
    }

    const newObj = {};
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== 'password') {
        newObj[key] = this.removePasswordField(data[key]);
      }
    }
    return newObj;
  }
}
