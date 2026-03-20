import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { WatchPartiesService } from './watch-parties.service';
import type { WatchParty } from './watch-parties.service';
import { CreateWatchPartyDto } from './dto/create-watch-party.dto';

@Controller('watch-parties')
export class WatchPartiesController {
  constructor(private readonly watchPartiesService: WatchPartiesService) {}

  @Get()
  findAll(): Promise<WatchParty[]> {
    return this.watchPartiesService.findAll();
  }

  @Post()
  create(@Body() createWatchPartyDto: CreateWatchPartyDto): Promise<WatchParty> {
    return this.watchPartiesService.create(createWatchPartyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<WatchParty> {
    return this.watchPartiesService.findOne(id);
  }

  @Patch(':id/rsvp')
  toggleRsvp(@Param('id') id: string): Promise<WatchParty> {
    return this.watchPartiesService.toggleRsvp(id);
  }
}
