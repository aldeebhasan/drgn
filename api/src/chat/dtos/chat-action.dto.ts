import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from '../../models/user.model';
import { Type } from 'class-transformer';

export class ChatActionDto {
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
