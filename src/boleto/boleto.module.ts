import { Module } from '@nestjs/common';
import { BoletoService } from './boleto.service';

@Module({
  providers: [BoletoService],
})
export class BoletoModule {}
