import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BankingModule } from '../banking/banking.module';
import { BoletoProcessor } from './processors/boleto.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'boleto',
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: true,
        attempts: 6,
        backoff: {
          type: 'exponential',
          delay: 3000,
        },
      },
    }),
    BankingModule,
  ],
  providers: [BoletoProcessor],
})
export class BoletoListenerModule {}
