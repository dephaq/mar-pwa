import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

export interface AudienceProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: string;
  city: string;
  prescreener: Record<string, string>;
}

export interface AudienceFilter {
  q?: string;
  city?: string;
  gender?: string;
  prescreenQuestion?: string;
  prescreenAnswer?: string;
}

export interface Segment {
  id: string;
  name: string;
  filter: AudienceFilter;
}

@Injectable()
export class AudienceService {
  private readonly audience: AudienceProfile[] = [
    {
      id: '1',
      email: 'alice@example.com',
      name: 'Alice',
      age: 25,
      gender: 'female',
      city: 'Paris',
      prescreener: { hobby: 'sports' },
    },
    {
      id: '2',
      email: 'bob@example.com',
      name: 'Bob',
      age: 30,
      gender: 'male',
      city: 'Berlin',
      prescreener: { hobby: 'music' },
    },
  ];

  private readonly segments: Segment[] = [];

  search(filter: AudienceFilter): AudienceProfile[] {
    return this.audience.filter((p) => {
      if (filter.q) {
        const q = filter.q.toLowerCase();
        if (!p.email.toLowerCase().includes(q) && !p.name.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (filter.city && p.city !== filter.city) return false;
      if (filter.gender && p.gender !== filter.gender) return false;
      if (filter.prescreenQuestion && filter.prescreenAnswer) {
        if (p.prescreener[filter.prescreenQuestion] !== filter.prescreenAnswer) {
          return false;
        }
      }
      return true;
    });
  }

  saveSegment(name: string, filter: AudienceFilter): Segment {
    const segment: Segment = { id: randomUUID(), name, filter };
    this.segments.push(segment);
    return segment;
  }

  listSegments(): Segment[] {
    return this.segments;
  }

  getSegment(id: string): Segment | undefined {
    return this.segments.find((s) => s.id === id);
  }

  exportCsv(filter: AudienceFilter): string {
    const data = this.search(filter);
    const header = 'id,email,name,age,gender,city';
    const rows = data.map(
      (p) => `${p.id},${p.email},${p.name},${p.age},${p.gender},${p.city}`,
    );
    return [header, ...rows].join('\n');
  }
}

