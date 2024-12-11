import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Account } from '../../account/entities/account.entity';
import { Boleto } from '../../boleto/entities/boleto.entity';
import { BoletoStatusEnum } from '../../boleto/enums/boleto-status.enum';
import { IBoletoBanking } from '../interfaces/boleto.banking.interface';
import { BancoBrasilClient } from './banco-brasil.client';
import { BoletoResponseBancoBrasilDto } from './dtos/boleto-response.banco-brasil.dto';
import { FindAllBoletoBancoBrasilDto } from './dtos/find-all-boleto.banco-brasil.dto';
import { BoletoBancoBrasilException } from './exceptions/boleto.banco-brasil.exception';
import { CreateBoletoBancoBrasilTransform } from './transformers/create-boleto.banco-brasil.transform';
import { TIssueDataBoleto } from './types/issue-data-boleto.type';

@Injectable()
export class BoletoBancoBrasilService implements IBoletoBanking {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async register(account: Account, boleto: Boleto): Promise<Boleto> {
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
      account.credentials,
    );

    Logger.log(
      `[BoletoBancoBrasilService] Payload: ${JSON.stringify(payload)}`,
    );

    try {
      const { data: boletoData } =
        await bancoBrasilClient.request<BoletoResponseBancoBrasilDto>(
          'POST',
          '/cobrancas/v2/boletos',
          payload,
        );

      Logger.log(
        `[BoletoBancoBrasilService] Payload: ${JSON.stringify(boletoData)}`,
      );

      boleto.status = BoletoStatusEnum.OPENED;
      boleto.registeredAt = new Date();
      boleto.barcode = boletoData.codigoBarraNumerico;
      boleto.digitableLine = boletoData.linhaDigitavel;
      boleto.billingContractNumber = boletoData.numeroContratoCobranca;

      return boleto;
    } catch (error) {
      throw new BoletoBancoBrasilException({
        code: error.code,
        message: JSON.stringify(error.response?.data || error.message),
      });
    }
  }

  async conciliation(
    account: Account,
    params: FindAllBoletoBancoBrasilDto,
  ): Promise<Boleto[]> {
    Logger.log(
      '[BoletoBancoBrasilService] Find all boletos in Banco do Brasil',
    );

    const payload = instanceToPlain(params);
    const bancoBrasilClient = new BancoBrasilClient(
      this.cacheManager,
      account.credentials,
    );

    Logger.log(
      `[BoletoBancoBrasilService] Payload: ${JSON.stringify(payload)}`,
    );

    try {
      const { data: responseData } = await bancoBrasilClient.request(
        'POST',
        `/convenios/${params.agreementNumber}/listar-retorno-movimento`,
        payload,
      );

      Logger.log(
        `[BoletoBancoBrasilService] Payload: ${JSON.stringify(responseData)}`,
      );

      // boleto.status = BoletoStatusEnum.OPENED;
      // boleto.registeredAt = new Date();
      // boleto.barcode = responseData.codigoBarraNumerico;
      // boleto.digitableLine = responseData.linhaDigitavel;
      // boleto.billingContractNumber = responseData.numeroContratoCobranca;

      return null;
    } catch (error) {
      throw new BoletoBancoBrasilException({
        code: error.code,
        message: JSON.stringify(error.response?.data || error.message),
      });
    }
  }
}
