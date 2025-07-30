import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class CreateSlideDto {
  @IsString()
  title!: string;

  @IsString()
  content!: string;

  @IsNumber()
  order!: number;
}

export class CreateDeckDto {
  @IsString()
  title!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSlideDto)
  slides!: CreateSlideDto[];
}