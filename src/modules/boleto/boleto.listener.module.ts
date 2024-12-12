import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { BankingModule } from '../banking/banking.module';
import { BoletoService } from './boleto.service';
import { BoletoProcessor } from './processors/boleto.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'boleto',
    }),
    AccountModule,
    BankingModule,
  ],
  providers: [BoletoProcessor, BoletoService],
})
export class BoletoListenerModule {}
