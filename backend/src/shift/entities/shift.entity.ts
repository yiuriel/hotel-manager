import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  shiftId: string; // Unique identifier for each shift

  @ManyToOne(() => User, (user) => user.shifts, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User; // Staff member assigned to the shift

  @Column('timestamp')
  startTime: Date; // Start time of the shift

  @Column('timestamp')
  endTime: Date; // End time of the shift

  @Column('text', { nullable: true })
  notes: string; // Notes for the shift (e.g., tasks to complete)
}
