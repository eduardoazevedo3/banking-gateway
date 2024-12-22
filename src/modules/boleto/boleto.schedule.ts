import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

export class BoletoSchedule {
  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async boletoConciliation() {
    Logger.log('Boleto conciliation', 'BoletoSchedule');
  }
}
