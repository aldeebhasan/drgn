import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatActionDto } from './dtos/chat-action.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { Inject, UseFilters, UsePipes } from '@nestjs/common';
import { Room } from '../../models/room.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { WsExceptionsFilter } from './filters/ws-exceptions.filter';
import { ResponseDto } from '../../core/dtos/response.dto';
import { validationPipe } from '../../core/pipes/validation.pipe';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
@UsePipes(validationPipe)
@UseFilters(new WsExceptionsFilter())
export class ChatGateway {
  @WebSocketServer() server: Server; // Access to the WebSocket server instance

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private chatService: ChatService,
  ) {}

  async getRooms(): Promise<Record<string, Room> | null> {
    return this.cacheManager.get<Record<string, Room>>('rooms');
  }

  @SubscribeMessage('create')
  async handleCreateRoom(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { room } = data;
    const rooms = (await this.getRooms()) || {};
    if (rooms[room.name]) {
      throw new WsException('Room exist, join it if you want!');
    }
    rooms[room.name] = room;
    await this.cacheManager.set<Record<string, Room>>('rooms', rooms);
    client.emit('success', ResponseDto.success(room));
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { user, room } = data;
    const rooms = (await this.getRooms()) || {};
    if (!rooms[room.name]) {
      throw new WsException('Room Not found');
    }
    if (rooms[room.name].password !== room.password) {
      throw new WsException('Failed to join the room');
    }
    if (client.rooms.has(room.name)) {
      this.server
        .to(room.name)
        .emit('join', `${user.name} has joined the chat.`); // Broadcast to all clients
    }
    await client.join(room.name); // Join the user to a room (optional)
    client.emit('success', ResponseDto.success(room));
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { user, room } = data;
    await client.leave(room.name); // leave the user from a room (optional)
    this.server.to(room.name).emit('leave', `${user.name} has left the chat.`); // Broadcast to all clients
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: SendMessageDto): void {
    const { message, room } = data;
    this.server.to(room.name).emit('message', message); // Broadcast the message to all clients
  }
}
