import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      tap((data) => {
        const processItem = (item: Record<string, unknown>) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...rest } = item;
          return rest;
        };

        if (Array.isArray(data)) {
          return data.map(processItem);
        }

        return processItem(data);
      }),
    );
  }
}
