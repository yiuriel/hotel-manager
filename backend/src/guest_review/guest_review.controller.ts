import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestReviewService } from './guest_review.service';
import { CreateGuestReviewDto } from './dto/create-guest_review.dto';
import { UpdateGuestReviewDto } from './dto/update-guest_review.dto';

@Controller('guest-review')
export class GuestReviewController {
  constructor(private readonly guestReviewService: GuestReviewService) {}

  @Post()
  create(@Body() createGuestReviewDto: CreateGuestReviewDto) {
    return this.guestReviewService.create(createGuestReviewDto);
  }

  @Get()
  findAll() {
    return this.guestReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestReviewDto: UpdateGuestReviewDto) {
    return this.guestReviewService.update(+id, updateGuestReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestReviewService.remove(+id);
  }
}
