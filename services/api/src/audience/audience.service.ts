import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSegmentDto, SegmentDto, ParticipantDto } from './dto/create-segment.dto';
import { randomUUID } from 'crypto';

interface Filters {
  [key: string]: string;
}

@Injectable()
export class AudienceService {
  private participants: ParticipantDto[] = [
    {
      id: '1',
      attributes: { age: '25', city: 'NY' },
      prescreen: { smoker: 'no', pets: 'yes' },
    },
    {
      id: '2',
      attributes: { age: '30', city: 'LA' },
      prescreen: { smoker: 'yes', pets: 'no' },
    },
    {
      id: '3',
      attributes: { age: '22', city: 'NY' },
      prescreen: { smoker: 'no', pets: 'no' },
    },
  ];

  private segments: SegmentDto[] = [];

  search(filters: Filters): ParticipantDto[] {
    return this.participants.filter((p) =>
      Object.entries(filters).every(
        ([k, v]) => p.attributes[k] === v || p.prescreen[k] === v,
      ),
    );
  }

  listSegments(): SegmentDto[] {
    return this.segments;
  }

  createSegment(dto: CreateSegmentDto): SegmentDto {
    const segment: SegmentDto = { id: randomUUID(), ...dto };
    this.segments.push(segment);
    return segment;
  }

  exportSegment(id: string): string {
    const segment = this.segments.find((s) => s.id === id);
    if (!segment) throw new NotFoundException('Segment not found');
    const people = this.search(segment.filters);
    if (people.length === 0) return '';
    const headers = Array.from(
      new Set(
        people.flatMap((p) => [
          'id',
          ...Object.keys(p.attributes),
          ...Object.keys(p.prescreen),
        ]),
      ),
    );
    const rows = [headers.join(',')];
    for (const person of people) {
      rows.push(
        headers
          .map((h) => {
            if (h === 'id') return person.id;
            return person.attributes[h] ?? person.prescreen[h] ?? '';
          })
          .join(','),
      );
    }
    return rows.join('\n');
  }
}
