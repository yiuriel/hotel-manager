import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateShiftDto } from './dto/create-shift.dto';
import { ShiftService } from './shift.service';

@Controller('hotel/:hotelId/shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Post()
  create(
    @Body() createShiftDto: CreateShiftDto,
    @Param('hotelId') hotelId: string,
  ) {
    return this.shiftService.create(createShiftDto, hotelId);
  }
}
