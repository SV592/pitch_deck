import { IsString, IsArray, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateSlideDto {
  @IsOptional()
  @IsString()
  id?: string; // Assuming slides might have IDs for updates

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsNumber()
  order?: number;
}

export class UpdateDeckDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSlideDto)
  slides?: UpdateSlideDto[];
}