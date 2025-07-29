import { IsString, IsOptional } from 'class-validator';

export class GenerateDeckDto {
  @IsString()
  companyName: string;

  @IsString()
  industry: string;

  @IsOptional()
  @IsString()
  stage?: string;

  @IsOptional()
  @IsString()
  fundingGoal?: string;

  @IsString()
  problemStatement: string;

  @IsString()
  solution: string;

  @IsOptional()
  @IsString()
  businessModel?: string;

  @IsOptional()
  @IsString()
  targetMarket?: string;
}