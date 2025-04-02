import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '../shared/models/media.model';

@Pipe({
  name: 'castToMedia'
})
export class CastToMediaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): Media|null {
    return value ? <Media> value : null;
  }

}
