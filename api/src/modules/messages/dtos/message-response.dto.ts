import { Exclude, Expose, Type } from 'class-transformer';
import { PartResponseDto } from './part-response.dto';
import { UserResponseDto } from '../../users/dtos/user-response.dto';

@Exclude()
export class MessageResponseDto {
  @Expose()
  id: number;

  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;

  @Expose()
  created_at: Date;

  @Type(() => PartResponseDto)
  @Expose() // also the @Expose()
  parts: PartResponseDto[];
}
