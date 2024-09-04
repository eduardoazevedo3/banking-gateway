import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('boleto')
export class BoletoProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    console.log(
      `Processing boleto job "${job.id}" of type "${job.name}" with data ${JSON.stringify(job.data)}`,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted() {
    // do some stuff
  }
}
