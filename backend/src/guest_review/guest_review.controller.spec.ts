import { Test, TestingModule } from '@nestjs/testing';
import { GuestReviewController } from './guest_review.controller';
import { GuestReviewService } from './guest_review.service';

describe('GuestReviewController', () => {
  let controller: GuestReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestReviewController],
      providers: [GuestReviewService],
    }).compile();

    controller = module.get<GuestReviewController>(GuestReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
