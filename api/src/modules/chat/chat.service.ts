import { Injectable } from '@nestjs/common';
import { Room } from '../../models/room.model';
import { Message } from '../../models/message.model';
import { SendMessageDto } from './dtos/send-message.dto';
import { Server, Socket } from 'socket.io';
import { User } from '../../models/user.model';

@Injectable()
export class ChatService {
  notifyAll(server: Server, action: string, messaeg?: any, group?: string) {
    if (group) {
      server.to(group).emit(action, messaeg || '');
    } else {
      server.emit(action, messaeg || '');
    }
  }

  joinRoom(server: Server, client: Socket, user: User, room: Room) {
    this.notifyAll(
      server,
      'join',
      `${user.name} has joined the chat.`,
      `room_${room.id}`,
    );

    client.join(`room_${room.id}`);
  }

  leaveRoom(server: Server, client: Socket, user: User, room: Room) {
    client.leave(`room_${room.id}`);
    this.notifyAll(
      server,
      'leave',
      `${user.name} has left the chat.`,
      `room_${room.id}`,
    );
  }


}
