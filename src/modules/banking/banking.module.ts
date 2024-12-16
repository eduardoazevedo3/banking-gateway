import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../config/app-config.module';
import { BoletoBancoBrasilService } from './banco-brasil/boleto.banco-brasil.service';
import { BoletoBankingService } from './boleto.banking.service';

@Module({
  imports: [AppConfigModule, HttpModule],
  providers: [BoletoBankingService, BoletoBancoBrasilService],
  exports: [BoletoBankingService],
})
export class BankingModule {}
