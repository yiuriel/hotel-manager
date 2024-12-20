import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HotelService } from './hotel.service';

@Controller('organization/:organizationId/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param('organizationId') organizationId: string) {
    return this.hotelService.findHotelsByOrganizationId(organizationId);
  }
}
