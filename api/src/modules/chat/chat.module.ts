import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { UsersService } from '../users/users.service';
import { RoomsService } from '../rooms/rooms.service';
import { MessagesService } from '../messages/messages.service';

@Module({
  providers: [
    ChatService,
    UsersService,
    RoomsService,
    MessagesService,
    ChatGateway,
  ],
})
export class ChatModule {}
