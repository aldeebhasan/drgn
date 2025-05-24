import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  mobile: string = '';

  @IsString()
  password: string = '';

  @IsString()
  image: string = '';
}
