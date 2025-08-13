import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConsentDto } from './dto/consent.dto';

@ApiTags('consents')
@Controller('consents')
export class ConsentsController {
  private consents: ConsentDto[] = [];

  @Post()
  create(@Body() dto: ConsentDto) {
    this.consents.push(dto);
    return { ok: true };
  }
}
