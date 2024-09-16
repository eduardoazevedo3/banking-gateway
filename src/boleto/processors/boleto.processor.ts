import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { DataSource } from 'typeorm';
import { BoletoBankingService } from '../../banking/boleto.banking.service';
import { Boleto } from '../entities/boleto.entity';

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  @Inject() private readonly connection: DataSource;
  @Inject() private readonly boletoBankingService: BoletoBankingService;

  async process(job: Job<{ boletoId: number }, Boleto, string>): Promise<void> {
    Logger.log(
      `Processing boleto job "${job.id}" of type "${job.name}" with data ${JSON.stringify(job.data)}`,
    );

    let boleto = await this.connection.manager.findOneByOrFail(Boleto<object>, {
      id: job.data.boletoId,
    });

    boleto = await this.boletoBankingService.register(boleto);

    await this.connection.manager.save(Boleto<object>, {
      ...boleto,
    });
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
