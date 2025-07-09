import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '../chat/dtos/send-message.dto';
import { Message } from '../../models/message.model';
import { Part } from '../../models/part.model';
import { UserPayload } from '../users/types/user-payload.type';

@Injectable()
export class MessagesService {
  async create(message: SendMessageDto, auth: UserPayload) {
    const messageObj = await Message.create({
      user: { id: auth.id },
      room: { id: message.room_id },
    }).save();

    for (const part of message.parts) {
      await Part.create({
        message: { id: messageObj.id },
        type: part.type,
        content: part.content as string,
      }).save();
    }

    return this.findOne(messageObj.id);
  }

  async findOne(id: number) {
    const message = await Message.findOne({
      where: { id: id },
      relations: ['user', 'parts'],
    });
    for (const part of message?.parts ?? []) {
      part.formatted_content = await part.getContent(this);
    }
    return message;
  }
}
