import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class RoomActionDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsString()
  password: string;
}
