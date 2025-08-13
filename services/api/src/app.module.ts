import { Module } from '@nestjs/common';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { StudiesModule } from './studies/studies.module';
import { InvitationsModule } from './invitations/invitations.module';
import { ExportModule } from './export/export.module';
import { AudienceModule } from './audience/audience.module';

@Module({
  imports: [
    SubscriptionsModule,
    StudiesModule,
    InvitationsModule,
    ExportModule,
    AudienceModule,
  ],
})
export class AppModule {}
