import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiResponse } from 'cloudinary';
import { ResponseDto } from '../../core/dtos/response.dto';
import { Media } from '../../models/media.model';
import { MediaTypeEnums } from '../../enums/media-type.enums';
import { plainToInstance } from 'class-transformer';
import { MediaResponseDto } from '../messages/dtos/media-response.dto';

@Controller('uploader')
export class UploaderController {
  constructor(private service: UploaderService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async image(
    @UploadedFile('file') file: Express.Multer.File,
    @Body('user_id') user_id: number,
    @Body('room_id') room_id: number,
  ) {
    return this.service
      .uploadFile(file)
      .then(async (response: UploadApiResponse) => {
        const media = await Media.create({
          user: { id: user_id },
          room: { id: room_id },
          path: response?.secure_url ?? response.url ?? '',
          type: response.resource_type as MediaTypeEnums,
        }).save();

        const mediaRes = plainToInstance(MediaResponseDto, media);

        return ResponseDto.success(mediaRes);
      })
      .catch((err: Error) => {
        return ResponseDto.error(err.message);
      });
  }
}
