import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { PartTypeEnums } from '../../../enums/part-type.enums';
import { Part } from '../../../models/part.model';
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

  @Expose()
  @Transform(({ obj }) => {
    const part = obj as Part;
    const content = part.getContent();
    if (content instanceof Message) {
      return plainToInstance(MessageResponseDto, content);
    } else if (content instanceof Media) {
      return plainToInstance(MediaResponseDto, content);
    } else {
      return content;
    }
  })
  content: any;
}
