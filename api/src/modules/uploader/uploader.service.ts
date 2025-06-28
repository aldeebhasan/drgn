import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploaderService {
  private env: string = 'local';

  constructor(config: ConfigService) {
    cloudinary.config({
      cloud_name: config.get('CLOUDINARY_CLOUD_NAME'),
      api_key: config.get('CLOUDINARY_API_KEY'),
      api_secret: config.get('CLOUDINARY_API_SECRET'),
    });
    this.env = config.get('APP_ENV', 'local');
  }

  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: this.env,
            use_filename: true,
            overwrite: true,
          },
          (error, result) => {
            if (error) return reject(new Error(error.message));
            resolve(result);
          },
        )
        .end(file.buffer);
    });
  }

  path(public_id: string) {
    return cloudinary.url(public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });
  }
}
