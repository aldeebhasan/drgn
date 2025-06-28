import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class RoomCreateDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  code: string;

  @IsString()
  password: string;
}
