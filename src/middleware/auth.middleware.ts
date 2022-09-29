import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { RequestService } from "src/request/request.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  constructor(private readonly requestService: RequestService) {}

  use(req: Request, res: Response, next:NextFunction) {
    this.logger.log('AuthMiddleware.use()');

    const userId = '12345';
    this.requestService.setUserId(userId, req);

    next();
  }
}