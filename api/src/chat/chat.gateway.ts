import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatActionDto } from './dtos/chat-action.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { WsValidationFilter } from '../filters/ws-validation.filter';
import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
@UsePipes(new ValidationPipe())
@UseFilters(new WsValidationFilter())
export class ChatGateway {
  @WebSocketServer() server: Server; // Access to the WebSocket server instance
  private room: string = 'chat-room';

  // Handle "join" event
  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    const { user } = data;
    await client.join(this.room); // Join the user to a room (optional)
    this.server.to(this.room).emit('join', `${user.name} has joined the chat.`); // Broadcast to all clients
    return `Welcome, ${user.name}!`;
  }

  @SubscribeMessage('leave')
  async handleLeave(
    @MessageBody() data: ChatActionDto,
    @ConnectedSocket() client: Socket,
  ): Promise<string> {
    const { user } = data;
    await client.leave(this.room); // leave the user from a room (optional)
    this.server.to(this.room).emit('leave', `${user.name} has left the chat.`); // Broadcast to all clients
    return `GoodBay, ${user.name}!`;
  }

  // Handle "message" event
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: SendMessageDto): void {
    this.server.to(this.room).emit('message', data.message); // Broadcast the message to all clients
  }
}
