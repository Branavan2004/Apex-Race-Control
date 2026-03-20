import { Test, TestingModule } from '@nestjs/testing';
import { WatchPartiesController } from './watch-parties.controller';

describe('WatchPartiesController', () => {
  let controller: WatchPartiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchPartiesController],
    }).compile();

    controller = module.get<WatchPartiesController>(WatchPartiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
