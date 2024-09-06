import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BankingModule } from '../banking/banking.module';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';
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
    BullBoardModule.forFeature({
      name: 'boleto',
      adapter: BullMQAdapter,
    }),
    BankingModule,
  ],
  controllers: [BoletoController],
  providers: [BoletoService, BoletoProcessor],
})
export class BoletoModule {}
