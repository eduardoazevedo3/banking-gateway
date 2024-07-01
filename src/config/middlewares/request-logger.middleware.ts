import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, body, query: queryParams, originalUrl: url } = request;
    const startTime = Date.now();
    const context = 'HTTP';

    Logger.debug(`Started ${method} "${url}" for ${ip}`, context);

    if (Object.keys(body).length !== 0)
      Logger.debug(`Body: ${JSON.stringify(body)}`, context);

    if (Object.keys(queryParams).length !== 0)
      Logger.debug(`QueryParams: ${JSON.stringify(queryParams)}`, context);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') || 0;
      const responseTime = Date.now() - startTime;

      Logger.debug(
        `Completed ${statusCode} with ${contentLength} bytes | ${responseTime}ms\n\n`,
        context,
      );
    });

    next();
  }
}
