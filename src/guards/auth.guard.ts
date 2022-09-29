import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const isUserLoggedIn =
      request.headers['x-user-id'] !== undefined
        ? request.headers['x-user-id']
        : false;

    console.log('AuthGuard.canActivate() isUserLoggedIn:', isUserLoggedIn);
    return isUserLoggedIn;
  }
}
