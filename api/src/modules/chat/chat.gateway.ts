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
import { RoomActionDto } from './dtos/room-action.dto';
import { User } from '../../models/user.model';

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
  async createRoom(
    @MessageBody() data: RoomActionDto,
    @ConnectedSocket() client: Socket,
  ) {
    let room = await this.chatService.getRoomByName(data.name);
    if (room) {
      throw new WsException(
        'Room with same name already exist, join it if you want!',
      );
    }
    room = await this.chatService.createRoom(
      data.user_id,
      data.name,
      data.password || '',
    );
    client.emit('success', ResponseDto.success(room));
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: RoomActionDto,
    @ConnectedSocket() client: Socket,
  ) {
    const room = await this.chatService.joinRoom(data.name, data.password);
    if (!room) {
      throw new WsException(
        'Failed to join the room! Maybe notfound or wrong password',
      );
    }
    if (client.rooms.has(`room_${room.id}`)) {
      const user = await User.findOneByOrFail({ id: data.user_id });
      this.server
        .to(`room_${room.id}`)
        .emit('join', `${user.name} has joined the chat.`);
    }
    await client.join(`room_${room.id}`);
    client.emit('success', ResponseDto.success(room));
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
  ) {
    const user = await User.findOneByOrFail({ id: data.user_id });
    await client.leave(`room_${data.room_id}`);
    this.server
      .to(`room_${data.room_id}`)
      .emit('leave', `${user.name} has left the chat.`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: SendMessageDto) {
    const message = this.chatService.createMessage(
      data.user_id,
      data.room_id,
      data.parts,
    );
    this.server.to(`room_${data.room_id}`).emit('message', message);
  }
}
