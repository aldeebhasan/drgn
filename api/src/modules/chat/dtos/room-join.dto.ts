import { IsNotEmpty, IsString } from 'class-validator';

export class RoomJoinDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  password: string;
}
