import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Boleto } from '../entities/boleto.entity';

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  async process(job: Job<{ boletoId: number }, Boleto, string>): Promise<void> {
    console.log(
      `Processing boleto job "${job.id}" of type "${job.name}" with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    // do some stuff
  }
}
