import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { UploaderModule } from './modules/uploader/uploader.module';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './modules/chat/chat.module';
import { databaseProviders } from './providers/database.provider';
import { UsersModule } from './modules/users/users.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { MessagesService } from './modules/messages/messages.service';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist/client/browser'),
    }),
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    UploaderModule,
    ChatModule,
    UsersModule,
    RoomsModule,
    MessagesModule,
  ],
  providers: [...databaseProviders],
})
export class AppModule {}
