import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { WebPushService } from './webpush.service';
import {
  CampaignCreateDto,
  CampaignDto,
  NotificationEventDto,
  NotifyDto,
} from './dto';

@Injectable()
export class CampaignsService {
  private campaigns: CampaignDto[] = [];
  private events: NotificationEventDto[] = [];

  constructor(
    private readonly subscriptions: SubscriptionsService,
    private readonly webpush: WebPushService,
  ) {}

  create(dto: CampaignCreateDto): CampaignDto {
    const campaign: CampaignDto = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'draft',
      ...dto,
    };
    this.campaigns.push(campaign);
    return campaign;
  }

  list(): CampaignDto[] {
    return this.campaigns;
  }

  get(id: string): CampaignDto {
    const campaign = this.campaigns.find((c) => c.id === id);
    if (!campaign) throw new NotFoundException('Campaign not found');
    return campaign;
  }

  async notifyNow(dto: NotifyDto): Promise<{ sent: number }> {
    const subs = this.subscriptions.findAll();
    let sent = 0;
    for (const sub of subs) {
      try {
        await this.webpush.send(sub, {
          title: dto.title,
          body: dto.body,
          url: dto.url,
        }, dto.ttl);
        sent++;
      } catch (e) {
        // ignore
      }
    }
    return { sent };
  }

  async launch(id: string): Promise<{ launched: number }> {
    const campaign = this.get(id);
    campaign.status = 'launched';
    const subs = this.subscriptions.findAll();
    let launched = 0;
    for (const sub of subs) {
      try {
        await this.webpush.send(sub, {
          title: campaign.message.title,
          body: campaign.message.body,
          url: campaign.message.url,
        });
        this.events.push({
          id: randomUUID(),
          campaignId: id,
          subscriptionId: sub.id,
          status: 'sent',
          createdAt: new Date().toISOString(),
        });
        launched++;
      } catch (e: any) {
        this.events.push({
          id: randomUUID(),
          campaignId: id,
          subscriptionId: sub.id,
          status: 'failed',
          error: e?.message,
          createdAt: new Date().toISOString(),
        });
      }
    }
    return { launched };
  }

  stop(id: string): { stopped: boolean } {
    const campaign = this.get(id);
    campaign.status = 'stopped';
    return { stopped: true };
  }

  listEvents(id: string): NotificationEventDto[] {
    return this.events.filter((e) => e.campaignId === id);
  }
}
