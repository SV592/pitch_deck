
import { IsString, IsOptional } from 'class-validator';

export class UpdateSlideDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  speaker_notes?: string;
}
