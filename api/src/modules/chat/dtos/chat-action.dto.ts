import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChatActionDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  room_id: number;
}
