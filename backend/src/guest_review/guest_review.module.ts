import { Module } from '@nestjs/common';
import { GuestReviewService } from './guest_review.service';
import { GuestReviewController } from './guest_review.controller';

@Module({
  controllers: [GuestReviewController],
  providers: [GuestReviewService],
})
export class GuestReviewModule {}
