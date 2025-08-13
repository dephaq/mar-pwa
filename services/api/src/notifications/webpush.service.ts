import { Injectable } from '@nestjs/common';
import webpush from 'web-push';

@Injectable()
export class WebPushService {
  constructor() {
    const subject = process.env.VAPID_SUBJECT || '';
    const publicKey = process.env.VAPID_PUBLIC_KEY || '';
    const privateKey = process.env.VAPID_PRIVATE_KEY || '';
    if (publicKey && privateKey) {
      webpush.setVapidDetails(subject, publicKey, privateKey);
    }
  }

  send(subscription: any, payload: any, ttl?: number) {
    return webpush.sendNotification(subscription, JSON.stringify(payload), {
      TTL: ttl,
    });
  }
}
