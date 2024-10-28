import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { BoletoBankingService } from '../../banking/boleto.banking.service';
import { BoletoService } from '../boleto.service';
import { Boleto } from '../entities/boleto.entity';

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  @Inject()
  private readonly boletoBankingService: BoletoBankingService;

  @Inject()
  private readonly boletoService: BoletoService;

  async process(job: Job<{ boletoId: number }, Boleto, string>): Promise<void> {
    Logger.log(
      `Processing boleto job "${job.id}" of type "${job.name}" with data ${JSON.stringify(job.data)}`,
    );
    let boleto = await this.boletoService.findOneOrFail(
      { id: job.data.boletoId },
      { account: true },
    );
    boleto = await this.boletoBankingService.register(boleto);
    await this.boletoService.update(boleto.id, boleto);
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    Logger.log('Boleto job completed');
  }

  @OnWorkerEvent('failed')
  onFailed(_job: Job, error: Error) {
    Logger.error(error.stack);
  }
}
