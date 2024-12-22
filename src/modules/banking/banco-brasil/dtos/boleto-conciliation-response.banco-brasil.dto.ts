import { Expose, Transform, Type } from 'class-transformer';
import { CommandActionCodeBancoBrasilEnum } from '../enums/command-action-code.banco-brasil.enum';

export class BoletoConciliationBancoBrasilDto {
  /**
   * @description original name is dataMovimentoRetorno
   * @example 2024-11-01T00:00:00.000Z
   */
  @Expose({ name: 'dataMovimentoRetorno' })
  @Transform(({ value }) => value && new Date(value.split('.').reverse()), {
    toClassOnly: true,
  })
  returnMovementDate: Date;

  /**
   * @description original name is numeroConvenio
   * @example 3128557
   */
  @Expose({ name: 'numeroConvenio' })
  @Transform(({ value }) => value && value.toString(), { toClassOnly: true })
  agreementNumber: string;

  /**
   * @description original name is numeroTituloCobranca
   * @example 00031285570335122076
   */
  @Expose({ name: 'numeroTituloCobranca' })
  ourNumber: string;

  /**
   * @description original name is codigoComandoAcao
   * @example 2
   */
  @Expose({ name: 'codigoComandoAcao' })
  commandActionCode: CommandActionCodeBancoBrasilEnum;

  /**
   * @description original name is codigoPrefixoAgencia
   * @example 452
   */
  @Expose({ name: 'codigoPrefixoAgencia' })
  agencyPrefixCode: number;

  /**
   * @description original name is numeroContaCorrente
   * @example 123873
   */
  @Expose({ name: 'numeroContaCorrente' })
  checkingAccountNumber: number;

  /**
   * @description original name is numeroCarteiraCobranca
   * @example 17
   */
  @Expose({ name: 'numeroCarteiraCobranca' })
  billingWalletNumber: number;

  /**
   * @description original name is numeroVariacaoCarteiraCobranca
   * @example 35
   */
  @Expose({ name: 'numeroVariacaoCarteiraCobranca' })
  billingWalletVariationNumber: number;

  /**
   * @description original name is tipoCobranca
   * @example 7
   */
  @Expose({ name: 'tipoCobranca' })
  billingType: number;

  /**
   * @description original name is codigoControleParticipante
   * @example 123456
   */
  @Expose({ name: 'codigoControleParticipante' })
  participantControlCode: string;

  /**
   * @description original name is codigoEspecieBoleto
   * @example 1
   */
  @Expose({ name: 'codigoEspecieBoleto' })
  speciesCode: number;

  /**
   * @description original name is dataVencimentoBoleto
   * @example 2024-11-01T00:00:00.000Z
   */
  @Expose({ name: 'dataVencimentoBoleto' })
  @Transform(({ value }) => value && new Date(value.split('.').reverse()), {
    toClassOnly: true,
  })
  dueDate: Date;

  /**
   * @description original name is valorBoleto
   * @example 1144.6
   */
  @Expose({ name: 'valorBoleto' })
  amount: number;

  /**
   * @description original name is codigoBancoRecebedor
   * @example 1
   */
  @Expose({ name: 'codigoBancoRecebedor' })
  receivingBankCode: number;

  /**
   * @description original name is codigoPrefixoAgenciaRecebedora
   * @example 3477
   */
  @Expose({ name: 'codigoPrefixoAgenciaRecebedora' })
  receivingAgencyPrefixCode: number;

  /**
   * @description original name is dataCreditoPagamentoBoleto
   * @example 2024-11-01T00:00:00.000Z
   */
  @Expose({ name: 'dataCreditoPagamentoBoleto' })
  @Transform(({ value }) => value && new Date(value.split('.').reverse()), {
    toClassOnly: true,
  })
  creditDate: Date;

  /**
   * @description original name is valorTarifa
   * @example 1.9
   */
  @Expose({ name: 'valorTarifa' })
  feeAmount: number;

  /**
   * @description original name is valorOutrasDespesasCalculadas
   * @example 0
   */
  @Expose({ name: 'valorOutrasDespesasCalculadas' })
  otherExpensesAmount: number;

  /**
   * @description original name is valorJurosDesconto
   * @example 0
   */
  @Expose({ name: 'valorJurosDesconto' })
  discountInterestAmount: number;

  /**
   * @description original name is valorIofDesconto
   * @example 0
   */
  @Expose({ name: 'valorIofDesconto' })
  iofDiscountAmount: number;

  /**
   * @description original name is valorAbatimento
   * @example 0
   */
  @Expose({ name: 'valorAbatimento' })
  abatementAmount: number;

  /**
   * @description original name is valorDesconto
   * @example 0
   */
  @Expose({ name: 'valorDesconto' })
  discountAmount: number;

  /**
   * @description original name is valorRecebido
   * @example 0
   */
  @Expose({ name: 'valorRecebido' })
  receivedAmount: number;

  /**
   * @description original name is valorJurosMora
   * @example 0
   */
  @Expose({ name: 'valorJurosMora' })
  interestAmount: number;

  /**
   * @description original name is valorOutrosValoresRecebidos
   * @example 0
   */
  @Expose({ name: 'valorOutrosValoresRecebidos' })
  otherReceivedAmount: number;

  /**
   * @description original name is valorAbatimentoNaoUtilizado
   * @example 0
   */
  @Expose({ name: 'valorAbatimentoNaoUtilizado' })
  unusedDiscountAmount: number;

  /**
   * @description original name is valorLancamento
   * @example 0
   */
  @Expose({ name: 'valorLancamento' })
  launchAmount: number;

  /**
   * @description original name is codigoFormaPagamento
   * @example 0
   */
  @Expose({ name: 'codigoFormaPagamento' })
  paymentMethodCode: number;

  /**
   * @description original name is codigoValorAjuste
   * @example 0
   */
  @Expose({ name: 'codigoValorAjuste' })
  adjustmentValueCode: number;

  /**
   * @description original name is valorAjuste
   * @example 0
   */
  @Expose({ name: 'valorAjuste' })
  adjustmentValue: number;

  /**
   * @description original name is codigoAutorizacaoPagamentoParcial
   * @example 1
   */
  @Expose({ name: 'codigoAutorizacaoPagamentoParcial' })
  partialPaymentAuthorizationCode: number;

  /**
   * @description original name is codigoCanalPagamento
   * @example 50
   */
  @Expose({ name: 'codigoCanalPagamento' })
  paymentChannelCode: number;

  /**
   * @description original name is textoIdentificadorQRCode
   */
  @Expose({ name: 'textoIdentificadorQRCode' })
  qrCodeIdentifier: string;

  /**
   * @description original name is quantidadeDiasCalculo
   * @example 0
   */
  @Expose({ name: 'quantidadeDiasCalculo' })
  calculationDaysQuantity: number;

  /**
   * @description original name is valorTaxaDesconto
   * @example 0
   */
  @Expose({ name: 'valorTaxaDesconto' })
  discountRateAmount: number;

  /**
   * @description original name is valorTaxaIOF
   */
  @Expose({ name: 'valorTaxaIOF' })
  iofRateAmount: number;

  /**
   * @description original name is naturezaRecebimento
   * @example 0
   */
  @Expose({ name: 'naturezaRecebimento' })
  receivingNature: number;

  /**
   * @description original name is codigoTipoCobrancaComando
   * @example 0
   */
  @Expose({ name: 'codigoTipoCobrancaComando' })
  billingTypeCode: number;

  /**
   * @description original name is dataLiquidacaoBoleto
   * @example 2024-11-01T00:00:00.000Z
   */
  @Expose({ name: 'dataLiquidacaoBoleto' })
  @Transform(({ value }) => value && new Date(value.split('.').reverse()), {
    toClassOnly: true,
  })
  billSettlementDate: Date;

  /**
   * @description original name is URL
   */
  @Expose({ name: 'URL' })
  url: string;
}

export class BoletoConciliationResponseDto {
  /**
   * @description original name is indicadorContinuidade
   */
  @Expose({ name: 'indicadorContinuidade' })
  continuityIndicator: string;

  /**
   * @description original name is numeroUltimoRegistro
   * @example 1
   */
  @Expose({ name: 'numeroUltimoRegistro' })
  lastRecordNumber: number;

  /**
   * @description original name is listaRegistro
   */
  @Expose({ name: 'listaRegistro' })
  @Type(() => BoletoConciliationBancoBrasilDto)
  boletos: BoletoConciliationBancoBrasilDto[];
}
