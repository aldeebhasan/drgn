import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';

@Injectable()
export class HttpResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data: T) => {
        if (data instanceof ResponseDto) {
          return data;
        }
        return ResponseDto.success(data);
      }),
      catchError((err) =>
        throwError(() => {
          if (err instanceof HttpException) {
            return err;
          }
          return new HttpException(
            'Something went wrong',
            HttpStatus.BAD_REQUEST,
          );
        }),
      ),
    );
  }
}
