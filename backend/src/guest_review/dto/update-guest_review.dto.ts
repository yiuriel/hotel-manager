import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestReviewDto } from './create-guest_review.dto';

export class UpdateGuestReviewDto extends PartialType(CreateGuestReviewDto) {}
