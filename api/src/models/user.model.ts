import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  public id?: string;

  @IsString()
  @MaxLength(20)
  @MinLength(3)
  @IsNotEmpty()
  public name: string = '';
}
