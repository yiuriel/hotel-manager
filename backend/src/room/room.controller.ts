import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('hotel/:hotelId/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('hotelId') hotelId: string) {
    return this.roomService.findOne(id, hotelId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Param('hotelId') hotelId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, hotelId, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('hotelId') hotelId: string) {
    return this.roomService.remove(id, hotelId);
  }
}
