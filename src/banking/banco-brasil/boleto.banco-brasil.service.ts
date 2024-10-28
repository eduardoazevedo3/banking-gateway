import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Boleto } from '../../boleto/entities/boleto.entity';
import { BoletoStatusEnum } from '../../boleto/enums/boleto-status.enum';
import { IBoletoBanking } from '../interfaces/boleto.banking.interface';
import { BancoBrasilClient } from './banco-brasil.client';
import { BoletoBancoBrasilException } from './exceptions/boleto.banco-brasil.exception';
import { CreateBoletoBancoBrasilTransform } from './transformers/create-boleto.banco-brasil.transform';
import { TIssueDataBoleto } from './types/issue-data-boleto.type';

/**
{
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

@Injectable()
export class BoletoBancoBrasilService implements IBoletoBanking {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async register(boleto: Boleto): Promise<Boleto> {
    Logger.log(
      '[BoletoBancoBrasilService] Registering boleto in Banco do Brasil',
    );

    const createBoletoTransform = new CreateBoletoBancoBrasilTransform();
    const boletoDto = createBoletoTransform.transform(
      boleto as Boleto<TIssueDataBoleto>,
    );
    const payload = instanceToPlain(boletoDto);
    const bancoBrasilClient = new BancoBrasilClient(
      this.cacheManager,
      boleto.account.credentials,
    );

    Logger.log(
      `[BoletoBancoBrasilService] Payload: ${JSON.stringify(payload)}`,
    );

    try {
      const responseData = await bancoBrasilClient.request<any>(
        'POST',
        '/cobrancas/v2/boletos',
        payload,
      );

      Logger.log(
        `[BoletoBancoBrasilService] Payload: ${JSON.stringify(responseData)}`,
      );

      boleto.status = BoletoStatusEnum.OPENED;
      boleto.registeredAt = new Date();
      boleto.barcode = responseData.codigoBarraNumerico;
      boleto.digitableLine = responseData.linhaDigitavel;
      boleto.billingContractNumber = responseData.numeroContratoCobranca;
      return boleto;
    } catch (error) {
      throw new BoletoBancoBrasilException(
        JSON.stringify(error.response?.data || error.message),
      );
    }
  }
}
