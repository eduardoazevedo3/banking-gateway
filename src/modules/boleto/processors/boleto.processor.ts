import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import * as crypto from 'crypto';
import { Boleto } from '../../../entities/boleto.entity';
import { AccountService } from '../../account/account.service';
import { BoletoBankingService } from '../../banking/boleto.banking.service';
import { BoletoService } from '../boleto.service';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';
import {
  BoletoConciliationParams,
  BoletoGenericParams,
  BoletoOperationParams,
} from '../types/boleto-params.type';

type BoletoJobName = 'register' | 'conciliation';

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  @Inject()
  private readonly boletoBankingService: BoletoBankingService;

  @Inject()
  private readonly boletoService: BoletoService;

  @Inject()
  private readonly accountService: AccountService;

  @Inject(CACHE_MANAGER)
  private cacheManager: Cache;

  async process(
    job: Job<BoletoGenericParams, Boleto, BoletoJobName>,
  ): Promise<void> {
    Logger.log(
      `Processing boleto job "${job.id}" ` +
        `of type "${job.name}" with data ${JSON.stringify(job.data)}`,
      'BoletoProcessor.process',
    );
    await this[job.name](job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    Logger.log('Job completed', 'BoletoProcessor.onCompleted');
  }

  @OnWorkerEvent('failed')
  async onFailed(
    job: Job<BoletoGenericParams, Boleto, BoletoJobName>,
    error: Error,
  ) {
    if (job.name === 'register') {
      await this.boletoService.update(
        job.data.boletoId,
        { status: BoletoStatusEnum.FAILED },
        { skipFind: true },
      );
    }
    Logger.error(error.stack, 'BoletoProcessor.onFailed');
  }

  private async register({ boletoId }: BoletoOperationParams): Promise<Boleto> {
    let boleto = await this.boletoService.findOne(
      { id: boletoId },
      { findOrFail: true },
    );

    if (
      ![BoletoStatusEnum.PENDING, BoletoStatusEnum.FAILED].includes(
        boleto.status,
      )
    ) {
      Logger.log(
        `Boleto ${boleto.id} is ${boleto.status}`,
        'BoletoProcessor.register',
      );
      return;
    }

    await this.boletoService.update(
      boletoId,
      { status: BoletoStatusEnum.REGISTERING },
      { skipFind: true },
    );

    boleto = await this.boletoService.findOne(
      { id: boletoId },
      { findOrFail: true },
      { account: true },
    );

    boleto = await this.boletoBankingService.register(boleto.account, boleto);
    await this.boletoService.update(boleto.id, boleto);
  }

  private async conciliation(params: BoletoConciliationParams): Promise<void> {
    const account = await this.accountService.findOneOrFail(params.accountId);
    const perPage = 500;

    const boletoParams = {
      ...params,
      perPage,
    };

    const cacheKey = this.cacheKey(JSON.stringify(boletoParams));

    let boletos: Boleto[];
    let boletosCount = 0;
    let page = (await this.cacheManager.get<number>(cacheKey)) || 1;

    do {
      Logger.log(`Page: ${page}`, 'BoletoProcessor.conciliation');

      await this.cacheManager.set(cacheKey, page, 1000 * 120);

      boletos = await this.boletoBankingService.conciliation(account, {
        ...boletoParams,
        page,
      });

      boletos.forEach(async (boleto) => {
        if (boleto.status) Logger.log(JSON.stringify(boleto), 'boleto');
        // await this.boletoService.update(boleto.id, boleto);
      });

      page++;
      boletosCount += boletos?.length || 0;
    } while (boletos?.length === perPage);

    await this.cacheManager.del(cacheKey);

    Logger.log(
      `Total of boletos: ${boletosCount}`,
      'BoletoProcessor.conciliation',
    );
  }

  private cacheKey(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}
