import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class RoomCreateDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  code: string;

  @IsString()
  password: string;
}
