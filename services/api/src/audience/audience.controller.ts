import { Body, Controller, Get, Header, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AudienceService, AudienceFilter } from './audience.service';
import {
  AudienceDto,
  AudienceFilterDto,
  CreateSegmentDto,
  SegmentDto,
} from './dto/audience.dto';

@ApiTags('audience')
@Controller('audience')
export class AudienceController {
  constructor(private readonly service: AudienceService) {}

  @Get()
  list(@Query() query: AudienceFilterDto): AudienceDto[] {
    const filter = this.resolveFilter(query);
    return this.service.search(filter) as AudienceDto[];
  }

  @Get('export.csv')
  @Header('Content-Type', 'text/csv')
  exportCsv(@Query() query: AudienceFilterDto): string {
    const filter = this.resolveFilter(query);
    return this.service.exportCsv(filter);
  }

  @Get('segments')
  listSegments(): SegmentDto[] {
    return this.service.listSegments();
  }

  @Post('segments')
  createSegment(@Body() dto: CreateSegmentDto): SegmentDto {
    return this.service.saveSegment(dto.name, dto.filter);
  }

  private resolveFilter(query: AudienceFilterDto): AudienceFilter {
    if (query.segmentId) {
      const seg = this.service.getSegment(query.segmentId);
      if (seg) {
        return seg.filter;
      }
    }
    return query;
  }
}

