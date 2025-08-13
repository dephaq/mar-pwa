import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { WebPushService } from './webpush.service';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';

@Module({
  imports: [SubscriptionsModule],
  controllers: [CampaignsController],
  providers: [CampaignsService, WebPushService],
})
export class NotificationsModule {}
