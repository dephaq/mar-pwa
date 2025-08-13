import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudienceModule } from './audience/audience.module';
import { ProfileModule } from './profile/profile.module';
import { PrescreenModule } from './prescreen/prescreen.module';

@Module({
  imports: [AudienceModule, ProfileModule, PrescreenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
