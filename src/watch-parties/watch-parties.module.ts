import { Module } from '@nestjs/common';
import { WatchPartiesService } from './watch-parties.service';
import { WatchPartiesController } from './watch-parties.controller';

@Module({
  providers: [WatchPartiesService],
  controllers: [WatchPartiesController]
})
export class WatchPartiesModule {}
