import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { HotelDto } from './dto/hotel.dto';
import { Hotel } from './entities/hotel.entity';

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
        .where('hotel.id = :hotelId', { hotelId })
        .andWhere('hotel.organizationId = :organizationId', { organizationId })
        .getOne(),
      { excludeExtraneousValues: true },
    );
  }
}
