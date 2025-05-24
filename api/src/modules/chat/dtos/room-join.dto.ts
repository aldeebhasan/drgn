import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomJoinDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  password: string;
}
