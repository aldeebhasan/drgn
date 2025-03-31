import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { UploaderModule } from './modules/uploader/uploader.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './modules/chat/chat.gateway';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist/client/browser'),
    }),
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    UploaderModule,
  ],
  providers: [ChatGateway],
})
export class AppModule {}
