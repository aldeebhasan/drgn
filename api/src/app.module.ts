import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist/client/browser'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
