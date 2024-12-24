import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionsGuard } from 'src/permission/permission.guard';
import { Permissions } from '../permission/permission.decorator';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { HotelService } from './hotel.service';

@Controller('organization/:organizationId/hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Param('organizationId') organizationId: string) {
    return this.hotelService.findHotelsByOrganizationId(organizationId);
  }

  @Get(':hotelId')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('create:hotel') // Require this permission
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
