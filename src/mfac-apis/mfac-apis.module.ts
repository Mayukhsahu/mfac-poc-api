import { Module } from '@nestjs/common';
import { MfacApisService } from './mfac-apis.service';
import { MfacApisController } from './mfac-apis.controller';

@Module({
  controllers: [MfacApisController],
  providers: [MfacApisService]
})
export class MfacApisModule {}
