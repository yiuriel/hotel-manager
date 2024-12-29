import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { CreateShiftDto } from './dto/create-shift.dto';
import { Shift } from './entities/shift.entity';
import { EventsService } from 'src/events/events.service';

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepository: Repository<Shift>,

    private readonly eventsService: EventsService,
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

      const upcomingShiftCount = await this.getAllUserShiftsCount(
        createShiftDto.staffId,
        hotelId,
      );

      this.eventsService.emitShifts({
        shiftCount: upcomingShiftCount,
        userId: createShiftDto.staffId,
      });

      return {
        message: 'Shift created successfully',
        ok: true,
        shiftCount: upcomingShiftCount,
        userId: createShiftDto.staffId,
      };
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getAllUserShiftsCount(userId: string, hotelId: string) {
    return this.shiftRepository.count({
      where: {
        users: {
          id: userId,
          hotel: {
            id: hotelId,
          },
        },
        startTime: MoreThan(new Date()),
      },
    });
  }
}
