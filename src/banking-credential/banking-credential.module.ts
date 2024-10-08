import { Module } from '@nestjs/common';
import { BankingCredentialController } from './banking-credential.controller';
import { BankingCredentialService } from './banking-credential.service';

@Module({
  controllers: [BankingCredentialController],
  providers: [BankingCredentialService],
})
export class BankingCredentialModule {}
