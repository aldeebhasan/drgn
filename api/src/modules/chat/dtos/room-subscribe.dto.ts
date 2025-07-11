import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoomSubscribeDto {
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @IsString()
  passcode: string;
}
