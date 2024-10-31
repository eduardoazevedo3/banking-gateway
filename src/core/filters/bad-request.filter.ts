import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { RecordValidationException } from '../../modules/boleto/exceptions/record-validation.exception';

@Catch(RecordValidationException)
export class BadRequestFilter implements ExceptionFilter {
  catch(e: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: Array.isArray(e.message) ? e.message : [e.message],
    });
  }
}
