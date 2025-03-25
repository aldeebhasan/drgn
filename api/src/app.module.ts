import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from './chat/chat.gateway';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist/client/browser'),
    }),
    CacheModule.register({ isGlobal: true }),
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
