import { IsObject, ValidateNested } from 'class-validator';
import { Message } from '../../../models/message.model';
import { Type } from 'class-transformer';
import { Room } from '../../../models/room.model';

export class SendMessageDto {
  @ValidateNested()
  message: Message;

  @IsObject()
  @ValidateNested()
  @Type(() => Room)
  room: Room;
}
