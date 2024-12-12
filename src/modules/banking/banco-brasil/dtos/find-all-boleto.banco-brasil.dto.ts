import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindAllBoletoBancoBrasilDto {
  @ApiProperty({
    description: 'Start date to filter the boletos',
    example: '01.03.2022',
  })
  @Expose({ name: 'dataMovimentoRetornoInicial' })
  startDate: string; // FIXME: Change to Date type

  @ApiProperty({
    description: 'End date to filter the boletos',
    example: '01.03.2022',
  })
  @Expose({ name: 'dataMovimentoRetornoFinal' })
  endDate: string; // FIXME: Change to Date type

  @ApiPropertyOptional({
    description: 'Bank agency prefix code',
    example: 1,
  })
  @Expose({ name: 'codigoPrefixoAgencia' })
  agencyPrefixCode?: number;

  @ApiPropertyOptional({
    description: 'Bank account number',
    example: 12345678,
  })
  @Expose({ name: 'numeroContaCorrente' })
  accountNumber?: number;

  @ApiPropertyOptional({
    description: 'Billing wallet number. Indicate the type of billing service',
    example: 17,
  })
  @Expose({ name: 'numeroCarteiraCobranca' })
  billingWalletNumber?: number;

  @ApiPropertyOptional({
    description: 'Billing wallet variation number',
    example: 35,
  })
  @Expose({ name: 'numeroVariacaoCarteiraCobranca' })
  billingWalletVariationNumber?: number;

  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
  })
  @Expose({ name: 'numeroRegistroPretendido' })
  page: number;

  @ApiPropertyOptional({
    description: 'Number of records per page',
    example: 1_000,
    maximum: 10_000,
  })
  @Expose({ name: 'quantidadeRegistroPretendido' })
  perPage?: number;
}
