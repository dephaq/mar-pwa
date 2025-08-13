import { IsObject, IsString } from 'class-validator';

export class CreateSegmentDto {
  @IsString()
  name: string;

  @IsObject()
  filters: Record<string, string>;
}

export class SegmentDto extends CreateSegmentDto {
  id: string;
}

export interface ParticipantDto {
  id: string;
  attributes: Record<string, string>;
  prescreen: Record<string, string>;
}
