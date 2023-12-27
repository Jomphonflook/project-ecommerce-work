import { Test, TestingModule } from '@nestjs/testing';
import { HighlightController } from './highlight.controller';
import { HighlightService } from './highlight.service';

describe('HighlightController', () => {
  let controller: HighlightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HighlightController],
      providers: [HighlightService],
    }).compile();

    controller = module.get<HighlightController>(HighlightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
