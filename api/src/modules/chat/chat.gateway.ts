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
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { WsExceptionsFilter } from './filters/ws-exceptions.filter';
import { ResponseDto } from '../../core/dtos/response.dto';
import { validationPipe } from '../../core/pipes/validation.pipe';
import { ChatService } from './chat.service';
import { RoomCreateDto } from './dtos/room-create.dto';
import { RoomsService } from '../rooms/rooms.service';
import { UsersService } from '../users/users.service';
import { RoomJoinDto } from './dtos/room-join.dto';
import { plainToInstance } from 'class-transformer';
import { RoomResponseDto } from '../rooms/dtos/room-response.dto';
import { MessagesService } from '../messages/messages.service';
import { MessageResponseDto } from '../messages/dtos/message-response.dto';
import { WsAuthGuard } from '../users/guards/ws-auth.guard';
import { WsAuth } from '../users/decoraters/ws-auth.decorator';
import { UserPayload } from '../users/types/user-payload.type';
import { RoomSubscribeDto } from './dtos/room-subscribe.dto';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
@UsePipes(validationPipe)
@UseFilters(new WsExceptionsFilter())
@UseGuards(WsAuthGuard)
export class ChatGateway {
  @WebSocketServer() server: Server; // Access to the WebSocket server instance

  constructor(
    private chatService: ChatService,
    private userService: UsersService,
    private roomService: RoomsService,
    private messageService: MessagesService,
  ) {}

  @SubscribeMessage('rooms')
  async listRooms(
    @MessageBody() data: object,
    @ConnectedSocket() client: Socket,
    @WsAuth() auth: UserPayload,
  ) {
    const rooms = await this.roomService.findAll({ user_id: auth.id, ...data });

    const roomsRes = plainToInstance(RoomResponseDto, rooms);

    client.emit('success', ResponseDto.success(roomsRes));
  }

  @SubscribeMessage('create')
  async createRoom(
    @MessageBody() data: RoomCreateDto,
    @ConnectedSocket() client: Socket,
    @WsAuth() auth: UserPayload,
  ) {
    let room = await this.roomService.findOneByCode(data.code);
    if (room) {
      throw new WsException(
        'Room with same name already exist, join it if you want!',
      );
    }
    room = await this.roomService.create(
      auth.id,
      data.name,
      data.code,
      data.password || '',
      data.is_public,
    );
    const response = {
      room: plainToInstance(RoomResponseDto, room),
      passcode: await this.roomService.getToken(room, auth.id),
    };
    client.emit('success', ResponseDto.success(response));
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: RoomJoinDto,
    @ConnectedSocket() client: Socket,
    @WsAuth() auth: UserPayload,
  ) {
    const room = await this.roomService.findOneByCode(data.code);
    if (!room || !(await this.roomService.checkPassword(room, data.password))) {
      throw new WsException(
        'Failed to join the room! Maybe not found or wrong password',
      );
    }

    const response = {
      room: plainToInstance(RoomResponseDto, room),
      passcode: await this.roomService.getToken(room, auth.id),
    };
    client.emit('success', ResponseDto.success(response));
  }

  @SubscribeMessage('subscribe')
  async handleSubscribe(
    @MessageBody() data: RoomSubscribeDto,
    @ConnectedSocket() client: Socket,
    @WsAuth() auth: UserPayload,
  ) {
    const room = await this.roomService.findOneOrFail(data.room_id);
    const user = await this.userService.findOneOrFail(auth.id);

    if (!(await this.roomService.checkToken(data.passcode, room, user))) {
      throw new WsException('Failed to subscribe the room!');
    }

    this.chatService.joinRoom(this.server, client, user, room);

    const roomRes = plainToInstance(RoomResponseDto, room);
    client.emit('success', ResponseDto.success(roomRes));
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
    @WsAuth() auth: UserPayload,
  ) {
    const user = await this.userService.findOneOrFail(auth.id);
    const room = await this.roomService.findOneOrFail(data.room_id);
    this.chatService.leaveRoom(this.server, client, user, room);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: SendMessageDto,
    @WsAuth() auth: UserPayload,
  ) {
    const message = await this.messageService.create(data, auth);

    const msgRes = plainToInstance(MessageResponseDto, message);

    this.chatService.notifyAll(
      this.server,
      'message',
      msgRes,
      `room_${data.room_id}`,
    );
  }
}
