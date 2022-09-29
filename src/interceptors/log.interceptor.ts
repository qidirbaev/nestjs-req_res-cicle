import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const userAgend = request.get('user-agent') || '';
    const { method, ip, path: url } = request;

    console.log(`
      Request: ${method} ${url}
      User-Agent: ${userAgend}
      IP: ${ip}
      ${context.getClass().name}.${context.getHandler().name} invoked...
    `);

    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const elapsed = Date.now() - now;

        console.log(`
          Response: ${statusCode} ${method} ${url}
          User-Agent: ${userAgend}
          IP: ${ip}
          ${elapsed}ms elapsed
          ${context.getClass().name}.${context.getHandler().name} invoked...
        `);

        console.log('Response: ', res);
      }),
    );
  }
}
