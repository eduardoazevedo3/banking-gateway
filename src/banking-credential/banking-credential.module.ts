import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { BankingCredentialController } from './banking-credential.controller';
import { BankingCredentialService } from './banking-credential.service';

@Module({
  imports: [AccountModule],
  controllers: [BankingCredentialController],
  providers: [BankingCredentialService],
})
export class BankingCredentialModule {}
