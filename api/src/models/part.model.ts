import { IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class Part {
  @IsString()
  @Optional()
  id?: string;
  @IsString()
  @IsNotEmpty()
  type?: 'link' | 'text' | 'image';
  @IsString()
  @IsNotEmpty()
  content?: string = '';
}
