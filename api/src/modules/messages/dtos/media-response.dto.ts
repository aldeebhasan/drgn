import { Exclude, Expose } from 'class-transformer';
import { MediaTypeEnums } from '../../../enums/media-type.enums';

@Exclude()
export class MediaResponseDto {
  @Expose()
  id: number;

  @Expose()
  type: MediaTypeEnums;

  @Expose()
  path: string = '';
}
