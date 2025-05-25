import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

@Exclude()
export class AuthResponseDto {
  @Expose()
  token: string;

  @Type(() => UserResponseDto)
  @Expose()
  user: UserResponseDto;
}
