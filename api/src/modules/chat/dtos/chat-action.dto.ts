import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChatActionDto {
  @IsNumber()
  @IsNotEmpty()
  room_id: number;
}
