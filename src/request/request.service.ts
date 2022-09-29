import { Injectable, Req, Scope, Request } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class RequestService {
  private userId: string;

  // setter for userId
  setUserId(userId: string, @Req() req: Request): void {
    console.log('RequestService.setUserId() userId:', userId);

    req.headers['x-user-id'] = userId;

    this.userId = userId;
  }

  // getter for userId
  getUserId(): string {
    console.log('RequestService.getUserId() userId:', this.userId);
    return this.userId;
  }
}
