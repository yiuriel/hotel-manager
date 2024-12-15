import { Injectable } from '@nestjs/common';
import { CreateGuestReviewDto } from './dto/create-guest_review.dto';
import { UpdateGuestReviewDto } from './dto/update-guest_review.dto';

@Injectable()
export class GuestReviewService {
  create(createGuestReviewDto: CreateGuestReviewDto) {
    return 'This action adds a new guestReview';
  }

  findAll() {
    return `This action returns all guestReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guestReview`;
  }

  update(id: number, updateGuestReviewDto: UpdateGuestReviewDto) {
    return `This action updates a #${id} guestReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} guestReview`;
  }
}
