import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AccountService } from '../../account/account.service';
import { BoletoBankingService } from '../../banking/boleto.banking.service';
import { BoletoService } from '../boleto.service';
import { Boleto } from '../entities/boleto.entity';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';

type BoletoActions = 'register' | 'conciliate';

type BoletoData = {
  boletoId: number;
};

type BoletoFilterParams = {
  accountId: number;
  conciliationFileInitialDate: Date;
  conciliationFileFinalDate: Date;
};

type BoletoParams = BoletoData & BoletoFilterParams;

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  @Inject()
  private readonly boletoBankingService: BoletoBankingService;

  @Inject()
  private readonly boletoService: BoletoService;

  @Inject()
  private readonly accountService: AccountService;

  async process(job: Job<BoletoParams, Boleto, BoletoActions>): Promise<void> {
    Logger.log(
      `[BoletoProcessor] Processing boleto job "${job.id}" ` +
        `of type "${job.name}" with data ${JSON.stringify(job.data)}`,
    );
    await this[job.name](job.data);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    Logger.log('[BoletoProcessor] Job completed');
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error) {
    await this.boletoService.update(
      job.data.boletoId,
      { status: BoletoStatusEnum.FAILED },
      { skipFind: true },
    );
    Logger.error(error.stack);
  }

  private async register({ boletoId }: BoletoData): Promise<Boleto> {
    let boleto = await this.boletoService.findOne(
      { id: boletoId },
      { findOrFail: true },
    );

    if (
      ![BoletoStatusEnum.PENDING, BoletoStatusEnum.FAILED].includes(
        boleto.status,
      )
    ) {
      Logger.log(`[BoletoProcessor] Boleto ${boleto.id} is ${boleto.status}`);
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

  private async conciliate(params: BoletoFilterParams): Promise<void> {
    const account = await this.accountService.findOne(params.accountId);
    const boletos = await this.boletoBankingService.conciliation(
      account,
      params,
    );

    boletos.forEach(async (boleto) => {
      await this.boletoService.update(boleto.id, boleto);
    });
  }
}
