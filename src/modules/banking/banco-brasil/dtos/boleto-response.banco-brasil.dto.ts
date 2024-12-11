import { Expose } from 'class-transformer';

class BoletoBeneficiaryBancoBrasilDto {
  @Expose({ name: 'agencia' })
  agency: number;

  @Expose({ name: 'contaCorrente' })
  checkingAccount: number;

  @Expose({ name: 'tipoEndereco' })
  addressType: number;

  @Expose({ name: 'logradouro' })
  address: string;

  @Expose({ name: 'bairro' })
  neighborhood: string;

  @Expose({ name: 'cidade' })
  city: string;

  @Expose({ name: 'codigoCidade' })
  cityCode: number;

  @Expose({ name: 'uf' })
  state: string;

  @Expose({ name: 'cep' })
  zipCode: number;

  @Expose({ name: 'indicadorComprovacao' })
  proofOfAddressIndicator: string;
}

class BoletoQrCodeDto {
  @Expose({ name: 'url' })
  url: string;

  @Expose({ name: 'txId' })
  txId: string;

  @Expose({ name: 'emv' })
  emv: string;
}

/**
  @returns {
    "beneficiario": {
      "agencia": 452,
      "contaCorrente": 123873,
      "tipoEndereco": 1,
      "logradouro": "ST AUXILIAR DE GARAGENS RUA 9 LOTE 10",
      "bairro": "TAGUATINGA NORTE",
      "cidade": "BRASILIA",
      "codigoCidade": 2000,
      "uf": "DF",
      "cep": 72145760,
      "indicadorComprovacao": "0"
    },
    "qrCode": {
      "url": "",
      "txId": "",
      "emv": ""
    },
    "numero": "00031285570700000300",
    "numeroCarteira": 17,
    "numeroVariacaoCarteira": 35,
    "codigoCliente": 704950857,
    "linhaDigitavel": "00190000090312855707500000300178498400000010000",
    "codigoBarraNumerico": "00194984000000100000000003128557070000030017",
    "numeroContratoCobranca": 19581316,
    "observacao": ""
  }
*/
export class BoletoResponseBancoBrasilDto {
  @Expose({ name: 'beneficiario' })
  beneficiary: BoletoBeneficiaryBancoBrasilDto;

  @Expose({ name: 'qrCode' })
  qrCode: BoletoQrCodeDto;

  @Expose({ name: 'numero' })
  number: string;

  @Expose({ name: 'numeroCarteira' })
  walletNumber: number;

  @Expose({ name: 'numeroVariacaoCarteira' })
  walletVariationNumber: number;

  @Expose({ name: 'codigoCliente' })
  clientCode: number;

  @Expose({ name: 'linhaDigitavel' })
  readableLine: string;

  @Expose({ name: 'codigoBarraNumerico' })
  numericBarCode: string;

  @Expose({ name: 'numeroContratoCobranca' })
  billingContractNumber: number;

  @Expose({ name: 'observacao' })
  observation: string;
}
