import { Hotel } from 'src/hotel/entities/hotel.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier for each shift

  @ManyToOne(() => Hotel, (hotel) => hotel.shifts)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToMany(() => User, (user) => user.shifts)
  users: User[];

  @Column('timestamp')
  startTime: Date; // Start time of the shift

  @Column('timestamp')
  endTime: Date; // End time of the shift

  @Column('text', { nullable: true })
  notes: string; // Notes for the shift (e.g., tasks to complete)
}
