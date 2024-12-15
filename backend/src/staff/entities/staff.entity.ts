import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  staffId: string; // Unique identifier for each staff member

  @ManyToOne(() => Hotel, (hotel) => hotel.staff, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel; // Hotel where the staff member works

  @Column({ length: 100 })
  firstName: string; // Staffs first name

  @Column({ length: 100 })
  lastName: string; // Staff last name

  @Column({ length: 100, unique: true, nullable: true })
  email: string; // Contact email

  @Column({ length: 20, nullable: true })
  phone: string; // Contact phone number

  @Column({ length: 50 })
  role: string; // Role of the staff (e.g., Manager, Cleaner)

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  salary: number; // Salary of the staff

  @Column('date', { nullable: true })
  hiredDate: string; // Date of hiring

  @CreateDateColumn()
  createdAt: Date; // Timestamp of record creation

  @OneToMany(() => Shift, (shift) => shift.staff)
  shifts: Shift[]; // List of shifts for the staff member
}
