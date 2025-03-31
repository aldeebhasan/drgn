import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ResponseDto } from '../dtos/response.dto';
import { Response } from 'express';
import { isObject, isString } from '@nestjs/common/utils/shared.utils';
import { UnprocessableEntityException } from '@nestjs/common/exceptions/unprocessable-entity.exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;

    // Extract the error message from the exception
    const errors: object | string =
      exception instanceof UnprocessableEntityException
        ? exception.getResponse()
        : exception.message;

    const msg = isString(errors) ? errors : 'Validation failed';
    const validations = isObject(errors) ? errors : {};

    return response
      .status(statusCode)
      .json(ResponseDto.error(msg, validations));
  }
}
