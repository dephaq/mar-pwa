import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PrescreenBlockDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  question: string;

  @ApiProperty()
  @IsString()
  answer: string;
}

export class UpdatePrescreenBlockDto {
  @ApiPropertyOptional()
  @IsString()
  answer: string;
}
