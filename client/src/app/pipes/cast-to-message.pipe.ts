import { Pipe, PipeTransform } from '@angular/core';
import { Message } from '../shared/models/message.model';

@Pipe({
  name: 'castToMessage'
})
export class CastToMessagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): Message|null {
    return value ? <Message> value : null;
  }

}
