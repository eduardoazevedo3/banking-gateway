import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AccountService } from '../../account/account.service';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accountId = request.headers['account-id'];

    if (!accountId) return false;

    const account = await this.accountService.findOne(accountId);
    request.account = account;

    return !!account;
  }
}
