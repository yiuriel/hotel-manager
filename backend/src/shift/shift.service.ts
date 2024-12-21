import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,
  ) {}

  async create(createShiftDto: CreateShiftDto, hotelId: string) {
    try {
      const newShift = this.shiftRepository.create({
        notes: createShiftDto.notes,
        startTime: createShiftDto.startTime,
        endTime: createShiftDto.endTime,
        hotel: { id: hotelId },
        users: [{ id: createShiftDto.staffId }],
      });
      await this.shiftRepository.save(newShift);
      return { message: 'Shift created successfully' };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }
}
