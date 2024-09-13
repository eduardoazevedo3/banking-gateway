import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { AuthBadRequestException } from '../../banking/exceptions/auth-bad-request.exception';
import { RecordValidationException } from '../../boleto/exceptions/record-validation.exception';

@Catch(RecordValidationException, AuthBadRequestException)
export class BadRequestFilter implements ExceptionFilter {
  catch(e: EntityNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(400).json({
      statusCode: 400,
      error: 'Bad Request',
      message: [e.message],
    });
  }
}
