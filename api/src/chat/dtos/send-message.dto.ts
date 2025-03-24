import { ValidateNested } from 'class-validator';
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

export class SendMessageDto {
  @ValidateNested()
  message: Message;
}
