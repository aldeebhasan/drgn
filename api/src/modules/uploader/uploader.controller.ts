import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Controller('uploader')
export class UploaderController {
  constructor(private service: UploaderService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async image(@UploadedFile('file') file: Express.Multer.File) {
    return this.service
      .uploadFile(file)
      .then((response: UploadApiResponse) => {
        return {
          success: true,
          message: 'Done',
          data: {
            url: response?.secure_url ?? response.url ?? '',
            public_id: response.public_id,
          },
        };
      })
      .catch((err: UploadApiErrorResponse) => {
        return {
          success: false,
          message: err.message,
          data: null,
        };
      });
  }
}
