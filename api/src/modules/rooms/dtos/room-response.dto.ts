import { Exclude, Expose, Transform } from 'class-transformer';
import { User } from '../../../models/user.model';
import { Room } from '../../../models/room.model';

@Exclude()
export class RoomResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  is_public: boolean;

  @Expose()
  @Transform(({ obj }): any => {
    const user = (obj as Room)?.user;
    return user ? { id: user.id, name: user.name } : null;
  })
  user: User;

  @Expose()
  created_at: Date;
}
