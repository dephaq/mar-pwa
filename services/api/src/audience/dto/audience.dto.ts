import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AudienceFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prescreenQuestion?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  prescreenAnswer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  segmentId?: string;
}

export class AudienceDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty()
  @IsString()
  city: string;
}

export class CreateSegmentDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: AudienceFilterDto })
  filter: AudienceFilterDto;
}

export class SegmentDto extends CreateSegmentDto {
  @ApiProperty()
  @IsString()
  id: string;
}
