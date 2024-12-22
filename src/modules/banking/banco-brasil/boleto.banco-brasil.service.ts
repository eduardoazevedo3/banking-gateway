import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Account } from '../../../entities/account.entity';
import { Boleto } from '../../../entities/boleto.entity';
import { BoletoStatusEnum } from '../../boleto/enums/boleto-status.enum';
import {
  BoletoConciliationParams,
  BoletoPageParams,
} from '../../boleto/types/boleto-params.type';
import { IBoletoBanking } from '../interfaces/boleto.banking.interface';
import { BancoBrasilClient } from './banco-brasil.client';
import { BoletoConciliationResponseDto } from './dtos/boleto-conciliation-response.banco-brasil.dto';
import { BoletoResponseBancoBrasilDto } from './dtos/boleto-response.banco-brasil.dto';
import { FindAllBoletoBancoBrasilDto } from './dtos/find-all-boleto.banco-brasil.dto';
import { CommandActionCodeBancoBrasilEnum } from './enums/command-action-code.banco-brasil.enum';
import { BoletoBancoBrasilException } from './exceptions/boleto.banco-brasil.exception';
import { CreateBoletoBancoBrasilTransform } from './transformers/create-boleto.banco-brasil.transform';
import { TIssueDataBoletoBancoBrasil } from './types/issue-data-boleto.banco-brasil.type';

@Injectable()
export class BoletoBancoBrasilService implements IBoletoBanking {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async register(account: Account, boleto: Boleto): Promise<Boleto> {
    Logger.log(
      'Registering boleto in Banco do Brasil',
      'BoletoBancoBrasilService.register',
    );

    const createBoletoTransform = new CreateBoletoBancoBrasilTransform();
    const boletoDto = createBoletoTransform.transform(
      boleto as Boleto<TIssueDataBoletoBancoBrasil>,
    );
    const payload = instanceToPlain(boletoDto);
    const bancoBrasilClient = new BancoBrasilClient(
      this.cacheManager,
      account.credentials,
    );

    Logger.log(
      `Payload: ${JSON.stringify(payload)}`,
      'BoletoBancoBrasilService.register',
    );

    try {
      const { data: boletoData } =
        await bancoBrasilClient.request<BoletoResponseBancoBrasilDto>(
          'POST',
          '/cobrancas/v2/boletos',
          payload,
        );

      Logger.log(
        `Response: ${JSON.stringify(boletoData)}`,
        'BoletoBancoBrasilService.register',
      );

      boleto.status = BoletoStatusEnum.OPENED;
      boleto.registeredAt = new Date();
      boleto.barcode = boletoData.barcode;
      boleto.digitableLine = boletoData.digitableLine;
      boleto.billingContractNumber = boletoData.billingContractNumber;

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
    params: BoletoConciliationParams & BoletoPageParams,
  ): Promise<Boleto[]> {
    Logger.log(
      `Find all boletos with: ${JSON.stringify(params)}`,
      'BoletoBancoBrasilService.conciliation',
    );

    const findAllParams = Object.assign(new FindAllBoletoBancoBrasilDto(), {
      startDate: params.startDate,
      endDate: params.startDate,
      accountNumber: params.accountNumber,
      agencyPrefixCode: params.agencyPrefixCode,
      billingWalletNumber: params.billingWalletNumber,
      billingWalletVariationNumber: params.billingWalletNumber,
      page:
        params.page === 1
          ? params.page
          : (params.page - 1) * params.perPage + 1,
      perPage: params.perPage,
    });

    const payload = instanceToPlain(findAllParams);
    const bancoBrasilClient = new BancoBrasilClient(
      this.cacheManager,
      account.credentials,
    );

    Logger.log(
      `Payload: ${JSON.stringify(payload)}`,
      'BoletoBancoBrasilService.conciliation',
    );

    try {
      const { data } = await bancoBrasilClient.request(
        'POST',
        `cobrancas/v2/convenios/${params.agreementNumber}/listar-retorno-movimento`,
        payload,
      );

      const responseData = plainToInstance(
        BoletoConciliationResponseDto,
        data,
        { enableCircularCheck: true },
      );

      return responseData.boletos.map<Boleto>(
        ({ commandActionCode: command, ...boletoData }) => {
          const boleto = new Boleto<TIssueDataBoletoBancoBrasil>({
            accountId: account.id,
            covenantId: boletoData.agreementNumber,
            ourNumber: boletoData.ourNumber,
          });

          switch (command) {
            case CommandActionCodeBancoBrasilEnum.NORMAL_SETTLEMENT:
              boleto.paymentDate = boletoData.returnMovementDate;
              boleto.creditDate = boletoData.creditDate;
              boleto.receivedAmount = boletoData.receivedAmount;
              boleto.discountAmount = boletoData.discountAmount;
              boleto.interestAmount = boletoData.interestAmount;
              boleto.feeAmount = boletoData.feeAmount;
              boleto.status = BoletoStatusEnum.PAID;
              break;
            case CommandActionCodeBancoBrasilEnum.WRITE_OFF:
              boleto.dischargeDate = boletoData.returnMovementDate;
              boleto.status = BoletoStatusEnum.CANCELED;
              break;
          }

          return boleto;
        },
      );
    } catch (error) {
      throw new BoletoBancoBrasilException({
        code: error.code,
        message: JSON.stringify(error.response?.data || error.message),
      });
    }
  }
}
