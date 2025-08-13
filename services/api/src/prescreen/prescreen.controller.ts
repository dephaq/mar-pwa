import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { PrescreenService } from './prescreen.service';
import { PrescreenBlockDto, UpdatePrescreenBlockDto } from './dto/prescreen-block.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('prescreen')
@Controller('prescreen')
export class PrescreenController {
  constructor(private readonly service: PrescreenService) {}

  @Get()
  getBlocks(): PrescreenBlockDto[] {
    return this.service.findAll();
  }

  @Put(':id')
  updateBlock(
    @Param('id') id: string,
    @Body() dto: UpdatePrescreenBlockDto,
  ): PrescreenBlockDto {
    return this.service.update(id, dto);
  }
}
