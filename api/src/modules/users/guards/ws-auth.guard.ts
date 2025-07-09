import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as JWTAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../core/handlers/meta.handlers';
import { Socket } from 'socket.io';
import { UserPayload } from '../types/user-payload.type';

@Injectable()
export class WsAuthGuard extends JWTAuthGuard('jwt-socket') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const token: string = (client.handshake.auth.token || '') as string;
    return { headers: { authorization: token } };
  }

  handleRequest(
    err: any,
    user: UserPayload,
    info: any,
    context: ExecutionContext,
  ): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const client: any = context.switchToWs().getClient();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    client.user = user;
    return super.handleRequest(err, user, info, context);
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
