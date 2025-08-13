import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StudiesService } from './studies.service';
import { CreateStudyDto, StudyDto } from './dto/create-study.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('studies')
@Controller('studies')
export class StudiesController {
  constructor(private readonly service: StudiesService) {}

  @Post()
  create(@Body() dto: CreateStudyDto): StudyDto {
    return this.service.create(dto);
  }

  @Get()
  findAll(): StudyDto[] {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): StudyDto {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateStudyDto): StudyDto {
    return this.service.update(id, dto);
  }
}
