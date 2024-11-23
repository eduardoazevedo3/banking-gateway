import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { BoletoBankingService } from '../../banking/boleto.banking.service';
import { BoletoService } from '../boleto.service';
import { Boleto } from '../entities/boleto.entity';
import { BoletoStatusEnum } from '../enums/boleto-status.enum';

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  @Inject()
  private readonly boletoBankingService: BoletoBankingService;

  @Inject()
  private readonly boletoService: BoletoService;

  async process(job: Job<{ boletoId: number }, Boleto, string>): Promise<void> {
    Logger.log(
      `[BoletoProcessor] Processing boleto job "${job.id}" ` +
        `of type "${job.name}" with data ${JSON.stringify(job.data)}`,
    );

    let boleto = await this.boletoService.findOneOrFail({
      id: job.data.boletoId,
    });

    if (
      ![BoletoStatusEnum.PENDING, BoletoStatusEnum.FAILED].includes(
        boleto.status,
      )
    ) {
      Logger.log(`[BoletoProcessor] Boleto ${boleto.id} is ${boleto.status}`);
      return;
    }

    await this.boletoService.update(
      job.data.boletoId,
      { status: BoletoStatusEnum.REGISTERING },
      { skipFind: true },
    );

    boleto = await this.boletoService.findOneOrFail(
      { id: job.data.boletoId },
      { account: true },
    );

    boleto = await this.boletoBankingService.register(boleto);

    await this.boletoService.update(boleto.id, boleto);
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
}
