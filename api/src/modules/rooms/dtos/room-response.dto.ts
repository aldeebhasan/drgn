import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RoomResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  created_at: Date;
}
