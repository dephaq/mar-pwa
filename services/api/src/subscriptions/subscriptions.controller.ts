import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto, SubscriptionDto } from './dto/create-subscription.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly service: SubscriptionsService) {}

  @Post()
  create(@Body() dto: CreateSubscriptionDto): SubscriptionDto {
    return this.service.create(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): void {
    this.service.remove(id);
  }
}
