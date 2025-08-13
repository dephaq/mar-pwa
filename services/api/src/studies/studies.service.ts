import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudyDto, StudyDto } from './dto/create-study.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class StudiesService {
  private studies: StudyDto[] = [];

  create(dto: CreateStudyDto): StudyDto {
    const study: StudyDto = { id: randomUUID(), ...dto };
    this.studies.push(study);
    return study;
  }

  findAll(): StudyDto[] {
    return this.studies;
  }

  findOne(id: string): StudyDto {
    const study = this.studies.find((s) => s.id === id);
    if (!study) throw new NotFoundException('Study not found');
    return study;
  }
}
