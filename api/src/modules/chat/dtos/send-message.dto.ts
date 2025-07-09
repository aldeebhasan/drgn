import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PartTypeEnums } from '../../../enums/part-type.enums';

export class PartDto {
  @IsNotEmpty()
  @IsEnum(PartTypeEnums)
  type: PartTypeEnums;

  @IsNotEmpty()
  content: string | number;
}

export class SendMessageDto {
  @IsNumber()
  @IsNotEmpty()
  room_id: number;

  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: Array<PartDto>;
}
