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

  findHotelsByOrganizationId(organizationId: string) {
    return plainToInstance(
      HotelDto,
      this.hotelRepository.find({
        where: {
          organization: { id: organizationId },
        },
      }),
      { excludeExtraneousValues: true },
    );
  }
}
