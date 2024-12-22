import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { HotelDto } from './dto/hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async findHotelsByOrganizationId(organizationId: string) {
    return plainToInstance(
      HotelDto,
      this.hotelRepository
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.staff', 'staff')
        .loadRelationCountAndMap('hotel.staffCount', 'hotel.staff')
        .leftJoinAndSelect('hotel.rooms', 'rooms')
        .loadRelationCountAndMap('hotel.roomCount', 'hotel.rooms')
        .where('hotel.organizationId = :organizationId', { organizationId })
        .getMany(),
      { excludeExtraneousValues: true },
    );
  }

  async getHotelWithStaffAndShifts(organizationId: string, hotelId: string) {
    return plainToInstance(
      HotelDto,
      this.hotelRepository
        .createQueryBuilder('hotel')
        .leftJoinAndSelect('hotel.staff', 'staff')
        .leftJoinAndSelect('staff.shifts', 'shifts')
        .loadRelationCountAndMap('hotel.staffCount', 'hotel.staff')
        .leftJoinAndSelect('hotel.rooms', 'rooms')
        .loadRelationCountAndMap('hotel.roomCount', 'hotel.rooms')
        .where('hotel.id = :hotelId', { hotelId })
        .andWhere('hotel.organizationId = :organizationId', { organizationId })
        .getOne(),
      { excludeExtraneousValues: true },
    );
  }

  async addNewHotel(organizationId: string, newHotelDto: CreateHotelDto) {
    try {
      await this.hotelRepository.save({
        ...newHotelDto,
        organization: { id: organizationId },
      });
      return { ok: true, message: 'Hotel added successfully' };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
