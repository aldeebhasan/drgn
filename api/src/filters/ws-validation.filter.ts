import {
  Catch,
  ArgumentsHost,
  WsExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { isString } from '@nestjs/common/utils/shared.utils';

@Catch(WsException, HttpException)
export class WsValidationFilter implements WsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    // Extract the error message from the exception
    const error: object | string =
      exception instanceof WsException
        ? exception.getError()
        : ((exception.getResponse()['message'] || {}) as object);
    // Send a formatted error response to the client
    client.emit('error', {
      success: false,
      message: isString(error) ? error : 'Validation failed',
      errors: isString(error) ? {} : error,
    });
  }
}
