import { Controller, Get, Header } from '@nestjs/common';
import { ExportService } from './export.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('export')
@Controller('export')
export class ExportController {
  constructor(private readonly service: ExportService) {}

  @Get('invitations.csv')
  @Header('Content-Type', 'text/csv')
  getInvitationsCsv(): string {
    return this.service.invitationsCsv();
  }
}
