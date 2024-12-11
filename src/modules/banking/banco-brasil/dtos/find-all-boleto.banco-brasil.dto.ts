import { Expose } from 'class-transformer';

export class FindAllBoletoBancoBrasilDto {
  @Expose({ name: 'dataMovimentoRetornoInicial' })
  startDate?: Date;

  @Expose({ name: 'dataMovimentoRetornoFinal' })
  endDate?: Date;

  @Expose({ name: 'codigoPrefixoAgencia' })
  agencyPrefixCode?: number;

  @Expose({ name: 'numeroConvenio' })
  agreementNumber?: string;

  @Expose({ name: 'numeroContaCorrente' })
  accountNumber?: number;

  @Expose({ name: 'numeroCarteiraCobranca' })
  billingWalletNumber?: number;

  @Expose({ name: 'numeroVariacaoCarteiraCobranca' })
  billingWalletVariationNumber?: number;

  @Expose({ name: 'numeroRegistroPretendido' })
  registerNumber?: number;

  @Expose({ name: 'quantidadeRegistroPretendido' })
  registerQuantity?: number;
}
