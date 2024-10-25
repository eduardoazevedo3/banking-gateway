import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class FindBoletoParamsDto {
  @ApiProperty({ example: 1, type: 'integer' })
  @IsNumberString()
  id: number;
}
