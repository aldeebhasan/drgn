import {
  Catch,
  ArgumentsHost,
  WsExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException, HttpException)
export class WsValidationFilter implements WsExceptionFilter {
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    // Extract the error message from the exception
    const error: object | string =
      exception instanceof WsException
        ? exception.getError()
        : exception.getResponse()['message'] || {};
    console.log(error);
    // Send a formatted error response to the client
    client.emit('error', {
      status: 'error',
      message: 'Validation failed',
      errors: error, // Include the validation errors
    });
  }
}
