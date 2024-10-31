import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { bullQueueDefaultOptions } from '../../config/bull.config';
import { AccountGuard } from '../../core/guards/account.guard';
import { AccountService } from '../account/account.service';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

@Module({
  imports: [
    BullModule.registerQueue({
      ...bullQueueDefaultOptions,
      name: 'boleto',
    }),
    BullBoardModule.forFeature({
      name: 'boleto',
      adapter: BullMQAdapter,
    }),
  ],
  controllers: [BoletoController],
  providers: [AccountGuard, AccountService, BoletoService],
})
export class BoletoModule {}
