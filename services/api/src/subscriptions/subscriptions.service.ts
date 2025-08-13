import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto, SubscriptionDto } from './dto/create-subscription.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class SubscriptionsService {
  private subscriptions: SubscriptionDto[] = [];

  create(dto: CreateSubscriptionDto): SubscriptionDto {
    const subscription: SubscriptionDto = { id: randomUUID(), ...dto };
    this.subscriptions.push(subscription);
    return subscription;
  }

  remove(id: string): void {
    this.subscriptions = this.subscriptions.filter((s) => s.id !== id);
  }
}
