import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignCreateDto, NotifyDto } from './dto';

@Controller()
export class CampaignsController {
  constructor(private readonly service: CampaignsService) {}

  @Post('notify')
  notify(@Body() dto: NotifyDto) {
    return this.service.notifyNow(dto);
  }

  @Get('campaigns')
  list() {
    return this.service.list();
  }

  @Post('campaigns')
  create(@Body() dto: CampaignCreateDto) {
    return this.service.create(dto);
  }

  @Get('campaigns/:id')
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post('campaigns/:id')
  launch(@Param('id') id: string) {
    return this.service.launch(id);
  }

  @Put('campaigns/:id')
  stop(@Param('id') id: string) {
    return this.service.stop(id);
  }

  @Get('campaigns/:id/events')
  events(@Param('id') id: string) {
    return this.service.listEvents(id);
  }
}
