import { Module } from '@nestjs/common';
import { PrescreenService } from './prescreen.service';
import { PrescreenController } from './prescreen.controller';

@Module({
  controllers: [PrescreenController],
  providers: [PrescreenService],
})
export class PrescreenModule {}
