import { Staff } from 'src/staff/entities/staff.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn('uuid')
  shiftId: string; // Unique identifier for each shift

  @ManyToOne(() => Staff, (staff) => staff.shifts, { onDelete: 'CASCADE' })
  @JoinColumn()
  staff: Staff; // Staff member assigned to the shift

  @Column('timestamp')
  startTime: Date; // Start time of the shift

  @Column('timestamp')
  endTime: Date; // End time of the shift

  @Column('text', { nullable: true })
  notes: string; // Notes for the shift (e.g., tasks to complete)
}
