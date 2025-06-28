import { Injectable } from '@nestjs/common';
import { Room } from '../../models/room.model';
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

  async joinRoom(server: Server, client: Socket, user: User, room: Room) {
    this.notifyAll(
      server,
      'join',
      `${user.name} has joined the chat.`,
      `room_${room.id}`,
    );

    await client.join(`room_${room.id}`);
  }

  async leaveRoom(server: Server, client: Socket, user: User, room: Room) {
    await client.leave(`room_${room.id}`);
    this.notifyAll(
      server,
      'leave',
      `${user.name} has left the chat.`,
      `room_${room.id}`,
    );
  }
}
