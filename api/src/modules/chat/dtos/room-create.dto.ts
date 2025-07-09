import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';

export class RoomCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(10)
  code: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_public: boolean;
}
