import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string = '';

  @Expose()
  mobile: string = '';

  @Expose()
  image: string;

  @Expose()
  created_at: Date;

  @Expose()
  is_guest: boolean;
}
