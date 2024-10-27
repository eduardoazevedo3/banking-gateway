import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Account = createParamDecorator(
  async (_data: string, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.account;
  },
);
