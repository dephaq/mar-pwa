import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LaunchInvitationDto {
  @ApiProperty()
  @IsString()
  studyId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  segment?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  quota?: number;
}

export class LaunchInvitationResponseDto {
  @ApiProperty()
  @IsNumber()
  launched: number;
}
