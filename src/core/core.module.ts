import { GuardServices } from './services/guard-services';
import { Module } from '@nestjs/common';

@Module({
  providers: [GuardServices],
})
export class CoreModule {}
