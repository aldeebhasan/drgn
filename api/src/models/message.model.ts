import { User } from './user.model';
import { Part } from './part.model';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Optional } from '@nestjs/common';

export class Message {
  @IsString()
  @Optional()
  id?: string;
  @IsArray()
  @MinLength(1)
  @ValidateNested({ each: true })
  parts: Array<Part> = [];

  @ValidateNested()
  sender?: User;

  @IsString()
  @IsNotEmpty()
  createdAt?: string;
}
