import { ApiProperty } from '@nestjs/swagger';

export class RecordValidationErrorDto {
  @ApiProperty({ example: ['field1 is required', 'field2 is not decimal'] })
  message: string[];

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}
