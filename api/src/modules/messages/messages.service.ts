import { Injectable } from '@nestjs/common';
import { SendMessageDto } from '../chat/dtos/send-message.dto';
import { Message } from '../../models/message.model';
import { Part } from '../../models/part.model';

@Injectable()
export class MessagesService {

  async create(message: SendMessageDto) {
    const messageObj = await Message.create({
      user: { id: message.user_id },
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
