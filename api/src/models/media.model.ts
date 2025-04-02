import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class Media {
  @IsString()
  @Optional()
  id?: string;
  @IsString()
  @IsNotEmpty()
  type?: 'image' | 'video' | 'file' | 'audio';
  @IsString()
  @IsNotEmpty()
  path?: string = '';
}
