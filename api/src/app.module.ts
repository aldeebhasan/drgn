import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ChatGateway } from './chat/chat.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { UploaderController } from './modules/uploader/uploader.controller';
import { UploaderService } from './modules/uploader/uploader.service';
import { UploaderModule } from './modules/uploader/uploader.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client', 'dist/client/browser'),
    }),
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    UploaderModule,
  ],
  controllers: [UploaderController],
  providers: [ChatGateway, UploaderService],
})
export class AppModule {}
