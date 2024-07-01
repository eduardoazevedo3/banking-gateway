import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, body, query: queryParams, path: url } = request;
    const startTime = Date.now();

    const now = new Date().toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    this.logger.debug(`Started ${method} "${url}" for ${ip} at ${now}`);

    if (Object.keys(body).length !== 0)
      this.logger.debug(`Body: ${JSON.stringify(body)}`);

    if (Object.keys(queryParams).length !== 0)
      this.logger.debug(`QueryParams: ${JSON.stringify(queryParams)}`);

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length') || 0;
      const responseTime = Date.now() - startTime;

      this.logger.debug(
        `Completed ${statusCode} with ${contentLength} bytes | ${responseTime}ms\n\n`,
      );
    });

    next();
  }
}
