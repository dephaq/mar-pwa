import {
  IsString,
  IsUrl,
  IsNumber,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TargetAttributeDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}

export class QuotaDto {
  @ApiProperty({ type: [TargetAttributeDto] })
  @ValidateNested({ each: true })
  @Type(() => TargetAttributeDto)
  attributes: TargetAttributeDto[];

  @ApiProperty()
  @IsNumber()
  limit: number;
}

export class CreateStudyDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsUrl()
  link: string;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  reward: number;

  @ApiProperty()
  @IsDateString()
  deadline: string;

  @ApiProperty({ type: [TargetAttributeDto] })
  @ValidateNested({ each: true })
  @Type(() => TargetAttributeDto)
  targeting: TargetAttributeDto[];

  @ApiProperty({ type: [QuotaDto] })
  @ValidateNested({ each: true })
  @Type(() => QuotaDto)
  quotas: QuotaDto[];
}

export class StudyDto extends CreateStudyDto {
  @ApiProperty()
  @IsString()
  id: string;
}
