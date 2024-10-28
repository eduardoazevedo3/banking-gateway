import { HttpException, HttpStatus } from '@nestjs/common';

export class BoletoBancoBrasilException extends HttpException {
  constructor(
    message: string,
    httpStatus: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(message, httpStatus);
    this.name = BoletoBancoBrasilException.name;
  }
}
