import { Catch, ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
import { Socket } from 'socket.io';
import { isObject, isString } from '@nestjs/common/utils/shared.utils';
import { ResponseDto } from '../../../core/dtos/response.dto';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';

@Catch()
export class WsExceptionsFilter implements WsExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient<Socket>();

    // Extract the error message from the exception
    const errors: object | string =
      exception instanceof UnprocessableEntityException
        ? exception.getResponse()
        : exception.message;

    const msg = isString(errors) ? errors : 'Validation failed';
    const validations = isObject(errors) ? errors : {};
    // Send a formatted error response to the client
    client.emit('error', ResponseDto.error(msg, validations));
  }
}
