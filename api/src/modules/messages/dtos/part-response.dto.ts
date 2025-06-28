import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { PartTypeEnums } from '../../../enums/part-type.enums';
import { Message } from '../../../models/message.model';
import { MessageResponseDto } from './message-response.dto';
import { Media } from '../../../models/media.model';
import { MediaResponseDto } from './media-response.dto';

@Exclude()
export class PartResponseDto {
  @Expose()
  id: number;

  @Expose()
  type: PartTypeEnums;

  @Expose({ name: 'formatted_content' })
  @Transform(({ value }): any => {
    if (value instanceof Message) {
      return plainToInstance(MessageResponseDto, value);
    } else if (value instanceof Media) {
      return plainToInstance(MediaResponseDto, value);
    } else {
      return value;
    }
  })
  content: any;
}
