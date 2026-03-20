import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchPartiesModule } from './watch-parties/watch-parties.module';

@Module({
  imports: [WatchPartiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
