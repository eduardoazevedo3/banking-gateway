import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { AccountService } from '../../account/account.service';
import { BoletoBankingService } from '../../banking/boleto.banking.service';
import { BoletoService } from '../boleto.service';
import { Boleto } from '../entities/boleto.entity';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';

type BoletoActions = 'register' | 'conciliate';

export type BoletoData = {
  boletoId: number;
};

export type BoletoFilterParams = {
  accountId: number;
  agreementNumber: string;
  startDate: Date;
  endDate: Date;
  page: number;
  perPage: number;
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
    // await this.boletoService.update(
    //   job.data.boletoId,
    //   { status: BoletoStatusEnum.FAILED },
    //   { skipFind: true },
    // );
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

  private async conciliation(params: BoletoFilterParams): Promise<void> {
    const account = await this.accountService.findOneOrFail(params.accountId);
    const perPage = 1_000;

    let boletos: Boleto[];
    let page = 1;

    do {
      boletos = await this.boletoBankingService.conciliation(account, {
        ...params,
        page,
        perPage,
        agreementNumber: '3128557',
      });

      // boletos.forEach(async (boleto) => {
      //   await this.boletoService.update(boleto.id, boleto);
      // });

      page++;
    } while (boletos?.length === perPage);
  }
}
