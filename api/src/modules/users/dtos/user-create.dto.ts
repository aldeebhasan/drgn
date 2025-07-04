import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  mobile: string = '';

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string = '';

  @IsString()
  image: string = '';

  is_guest: boolean = false;
}
