import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { BankingModule } from '../banking/banking.module';
import { BoletoProcessor } from './boleto.processor';
import { BoletoSchedule } from './boleto.schedule';
import { BoletoService } from './boleto.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'boleto',
    }),
    BankingModule,
  ],
  providers: [BoletoProcessor, BoletoService, BoletoSchedule, AccountService],
})
export class BoletoListenerModule {}
