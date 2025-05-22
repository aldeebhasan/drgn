import { Injectable } from '@nestjs/common';
import { Room } from '../../models/room.model';
import * as bcrypt from 'bcrypt';
import { Message } from '../../models/message.model';
import { Part } from '../../models/part.model';
import { PartDto } from './dtos/send-message.dto';

@Injectable()
export class ChatService {
  async getRoomByName(name: string): Promise<Room | null> {
    return await Room.findOneBy({ name: name });
  }

  async createRoom(
    user_id: number,
    name: string,
    password: string = '',
  ): Promise<Room> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = password ? await bcrypt.hash(password, salt) : '';
    return Room.create({
      user: { id: user_id },
      name: name,
      password: hashedPassword,
    });
  }

  async joinRoom(name: string, password: string = '') {
    const room = await this.getRoomByName(name);
    if (room) {
      const isMatch = room.password
        ? await bcrypt.compare(password, room.password)
        : true;

      if (isMatch) {
        return room;
      }
    }
    return null;
  }

  createMessage(user_id: number, room_id: number, parts: Array<PartDto> = []) {
    const messageParts = parts.map((part) => {
      return {
        type: part.type,
        content: part.content as string,
      };
    });

    return Message.create({
      user: { id: user_id },
      room: { id: room_id },
      parts: messageParts,
    });
  }
}
