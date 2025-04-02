import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Message } from './message.model';
import { Media } from './media.model';

export class Part {
  @IsString()
  @Optional()
  id?: string;
  @IsString()
  @IsNotEmpty()
  type?: 'link' | 'text' | 'media' | 'message';
  @IsNotEmpty()
  content?: string | Message | Media = '';
}
