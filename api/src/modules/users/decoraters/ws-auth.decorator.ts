import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../types/user-payload.type';

export const WsAuth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const client = ctx.switchToWs().getClient();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return client.user as UserPayload;
  },
);
