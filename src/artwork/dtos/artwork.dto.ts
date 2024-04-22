import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ArtworkDto {

  @IsNumber()
  @Type(() => Number)
  id: number;
}
