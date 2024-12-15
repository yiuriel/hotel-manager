import { Test, TestingModule } from '@nestjs/testing';
import { GuestReviewService } from './guest_review.service';

describe('GuestReviewService', () => {
  let service: GuestReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestReviewService],
    }).compile();

    service = module.get<GuestReviewService>(GuestReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
