import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Controller('organization/:organizationId/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param('organizationId') organizationId: string) {
    return this.hotelService.findHotelsByOrganizationId(organizationId);
  }

  @UseGuards(AuthGuard)
  @Get(':hotelId')
  async findOne(
    @Param('organizationId') organizationId: string,
    @Param('hotelId') hotelId: string,
  ) {
    return this.hotelService.getHotelWithStaffAndShifts(
      organizationId,
      hotelId,
    );
  }

  @UseGuards(AuthGuard)
  @Post()
  async addNewHotel(
    @Param('organizationId') organizationId: string,
    @Body() hotel: CreateHotelDto,
  ) {
    return this.hotelService.addNewHotel(organizationId, hotel);
  }
}
