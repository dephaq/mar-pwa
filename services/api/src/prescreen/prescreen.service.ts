import { Injectable, NotFoundException } from '@nestjs/common';
import { PrescreenBlockDto, UpdatePrescreenBlockDto } from './dto/prescreen-block.dto';

@Injectable()
export class PrescreenService {
  private blocks: PrescreenBlockDto[] = [
    { id: 'about', question: 'Расскажите о себе', answer: '' },
    { id: 'hobbies', question: 'Ваши хобби', answer: '' },
  ];

  findAll(): PrescreenBlockDto[] {
    return this.blocks;
  }

  update(id: string, dto: UpdatePrescreenBlockDto): PrescreenBlockDto {
    const block = this.blocks.find((b) => b.id === id);
    if (!block) throw new NotFoundException('Block not found');
    block.answer = dto.answer;
    return block;
  }
}
