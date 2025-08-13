import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './audience/audience.module';
import { ProfileModule } from './profile/profile.module';
import { PrescreenModule } from './prescreen/prescreen.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConsentsModule } from './consents/consents.module';

@Module({
  imports: [
    AudienceModule,
    ProfileModule,
    PrescreenModule,
    SubscriptionsModule,
    NotificationsModule,
    ConsentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
