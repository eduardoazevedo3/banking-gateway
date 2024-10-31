import { HttpException, HttpExceptionOptions } from '@nestjs/common';

export class BoletoBancoBrasilException extends HttpException {
  constructor(
    response: string | Record<string, any>,
    status: number = 400,
    options?: HttpExceptionOptions,
  ) {
    super(response, status, options);
    this.name = BoletoBancoBrasilException.name;
  }
}
