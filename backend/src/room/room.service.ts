import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  create(createRoomDto: CreateRoomDto, hotelId: string) {
    try {
      return this.roomRepository.save({
        ...createRoomDto,
        hotel: { id: hotelId },
      });
    } catch (error) {
      return error;
    }
  }

  findAll(hotelId: string) {
    return this.roomRepository.find({ where: { hotel: { id: hotelId } } });
  }

  findOne(id: string, hotelId: string) {
    try {
      return this.roomRepository.findOne({
        where: { id, hotel: { id: hotelId } },
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: string, hotelId: string, updateRoomDto: UpdateRoomDto) {
    try {
      await this.roomRepository.update(
        { id, hotel: { id: hotelId } },
        updateRoomDto,
      );
      return {
        ok: true,
        message: 'Room updated successfully',
      };
    } catch (error) {
      return error;
    }
  }

  remove(id: string, hotelId: string) {
    try {
      return this.roomRepository.delete({ id, hotel: { id: hotelId } });
    } catch (error) {
      return error;
    }
  }
}
