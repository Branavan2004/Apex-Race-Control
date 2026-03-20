import { Test, TestingModule } from '@nestjs/testing';
import { WatchPartiesService } from './watch-parties.service';

describe('WatchPartiesService', () => {
  let service: WatchPartiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WatchPartiesService],
    }).compile();

    service = module.get<WatchPartiesService>(WatchPartiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
