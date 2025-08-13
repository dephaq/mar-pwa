import { Body, Controller, Get, Header, Param, Post, Query } from '@nestjs/common';
import { AudienceService } from './audience.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateSegmentDto, SegmentDto, ParticipantDto } from './dto/create-segment.dto';

@ApiTags('audience')
@Controller()
export class AudienceController {
  constructor(private readonly service: AudienceService) {}

  @Get('audience')
  search(@Query() query: Record<string, string>): ParticipantDto[] {
    const { attr, value, ...rest } = query;
    const filters = attr && value ? { [attr]: value, ...rest } : query;
    return this.service.search(filters);
  }

  @Get('segments')
  listSegments(): SegmentDto[] {
    return this.service.listSegments();
  }

  @Post('segments')
  createSegment(@Body() dto: CreateSegmentDto): SegmentDto {
    return this.service.createSegment(dto);
  }

  @Get('segments/:id/export')
  @Header('Content-Type', 'text/csv')
  exportSegment(@Param('id') id: string): string {
    return this.service.exportSegment(id);
  }
}
