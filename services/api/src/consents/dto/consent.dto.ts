import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConsentDto {
  @ApiProperty()
  @IsString()
  version: string;

  @ApiProperty()
  @IsString()
  textHash: string;

  @ApiProperty()
  @IsString()
  givenAt: string;
}
