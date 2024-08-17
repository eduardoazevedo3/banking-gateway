import { Module } from '@nestjs/common';
import { BankingModule } from '../banking/banking.module';
import { BoletoController } from './boleto.controller';
import { BoletoService } from './boleto.service';

@Module({
  imports: [BankingModule],
  controllers: [BoletoController],
  providers: [BoletoService],
})
export class BoletoModule {}
