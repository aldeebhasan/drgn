import { IsNotEmpty, IsString } from 'class-validator';

export class GuestCreateDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
