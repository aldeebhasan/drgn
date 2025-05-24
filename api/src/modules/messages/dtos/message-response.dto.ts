import { Exclude, Expose, Type } from 'class-transformer';
import { PartResponseDto } from './part-response.dto';

@Exclude()
export class MessageResponseDto {
  @Expose()
  id: number;

  @Expose()
  created_at: Date;

  @Type(() => PartResponseDto)
  @Expose() // also the @Expose()
  parts: PartResponseDto[];
}
