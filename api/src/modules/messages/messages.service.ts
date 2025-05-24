import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '../chat/dtos/send-message.dto';
import { Message } from '../../models/message.model';

@Injectable()
export class MessagesService {
  create(message: SendMessageDto) {
    const messageParts = message.parts.map((part) => {
      return {
        type: part.type,
        content: part.content as string,
      };
    });

    return Message.create({
      user: { id: message.user_id },
      room: { id: message.room_id },
      parts: messageParts,
    });
  }
}
