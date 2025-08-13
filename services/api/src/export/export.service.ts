import { Injectable } from '@nestjs/common';

@Injectable()
export class ExportService {
  invitationsCsv(): string {
    return 'id,studyId,userId\n';
  }
}
