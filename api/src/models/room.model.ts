import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class Room {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
