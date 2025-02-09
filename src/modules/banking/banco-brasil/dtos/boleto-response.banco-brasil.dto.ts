import { Expose, Transform } from 'class-transformer';

class BoletoBeneficiaryBancoBrasilDto {
  /**
   * @description original name is agencia
   * @example 12345
   */
  @Expose({ name: 'agencia' })
  agency: number;

  /**
   * @description original name is contaCorrente
   * @example 123456
   */
  @Expose({ name: 'contaCorrente' })
  checkingAccount: number;

  /**
   * @description original name is tipoEndereco
   * @example 1
   */
  @Expose({ name: 'tipoEndereco' })
  addressType: number;

  /**
   * @description original name is logradouro
   * @example "ST AUXILIAR DE GARAGENS RUA 9 LOTE 10"
   */
  @Expose({ name: 'logradouro' })
  address: string;

  /**
   * @description original name is bairro
   * @example "TAGUATINGA NORTE"
   */
  @Expose({ name: 'bairro' })
  neighborhood: string;

  /**
   * @description original name is cidade
   * @example "BRASILIA"
   */
  @Expose({ name: 'cidade' })
  city: string;

  /**
   * @description original name is codigoCidade
   * @example 2000
   */
  @Expose({ name: 'codigoCidade' })
  cityCode: number;

  /**
   * @description original name is uf
   * @example "DF"
   */
  @Expose({ name: 'uf' })
  state: string;

  /**
   * @description original name is cep
   * @example 12345-678
   */
  @Expose({ name: 'cep' })
  zipCode: number;

  /**
   * @description original name is indicadorComprovacao
   * @example "0"
   */
  @Expose({ name: 'indicadorComprovacao' })
  proofOfAddressIndicator: string;
}

class BoletoQrCodeDto {
  /**
   * @description original name is url
   * @example "https://example.com"
   */
  @Expose({ name: 'url' })
  url: string;

  /**
   * @description original name is txId
   * @example "1234567890"
   */
  @Expose({ name: 'txId' })
  txId: string;

  /**
   * @description original name is emv
   * @example "1234567890"
   */
  @Expose({ name: 'emv' })
  emv: string;
}

export class BoletoResponseBancoBrasilDto {
  /**
   * @description original name is beneficiario
   */
  @Expose({ name: 'beneficiario' })
  beneficiary: BoletoBeneficiaryBancoBrasilDto;

  /**
   * @description original name is qrCode
   */
  @Expose({ name: 'qrCode' })
  qrCode: BoletoQrCodeDto;

  /**
   * @description original name is numero
   * @example "00031285570700000300"
   */
  @Expose({ name: 'numero' })
  number: string;

  /**
   * @description original name is numeroCarteira
   * @example 17
   */
  @Expose({ name: 'numeroCarteira' })
  walletNumber: number;

  /**
   * @description original name is numeroVariacaoCarteira
   * @example 35
   */
  @Expose({ name: 'numeroVariacaoCarteira' })
  walletVariationNumber: number;

  /**
   * @description original name is codigoCliente
   * @example 704950857
   */
  @Expose({ name: 'codigoCliente' })
  clientCode: number;

  /**
   * @description original name is linhaDigitavel
   * @example "00190000090312855707500000300178498400000010000"
   */
  @Expose({ name: 'linhaDigitavel' })
  digitableLine: string;

  /**
   * @description original name is codigoBarraNumerico
   * @example "00194984000000100000000003128557070000030017"
   */
  @Expose({ name: 'codigoBarraNumerico' })
  barcode: string;

  /**
   * @description original name is numeroContratoCobranca
   * @example 19581316
   */
  @Expose({ name: 'numeroContratoCobranca' })
  @Transform(({ value }) => value.toString())
  billingContractNumber: string;

  /**
   * @description original name is observacao
   * @example "Uma observação qualquer"
   */
  @Expose({ name: 'observacao' })
  observation: string;
}
