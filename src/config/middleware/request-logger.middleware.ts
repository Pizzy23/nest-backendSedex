import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    this.logger.log(`Request: ${method} ${originalUrl} from ${ip}`);
    next();
  }
}
