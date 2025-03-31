import { IsObject, ValidateNested } from 'class-validator';
import { User } from '../../../models/user.model';
import { Type } from 'class-transformer';
import { Room } from '../../../models/room.model';

export class ChatActionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user: User;

  @IsObject()
  @ValidateNested()
  @Type(() => Room)
  room: Room;
}
