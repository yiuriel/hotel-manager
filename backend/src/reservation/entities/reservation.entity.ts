import { Guest } from 'src/guest/entities/guest.entity';
import { Room } from 'src/room/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  reservationId: string; // Unique identifier for each reservation

  @ManyToOne(() => Guest, (guest) => guest.reservations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  guest: Guest; // Guest who made the reservation

  @ManyToOne(() => Room, (room) => room.maintenanceRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  room: Room; // Room being reserved

  @Column('date')
  checkInDate: string; // Check-in date

  @Column('date')
  checkOutDate: string; // Check-out date

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number; // Total cost of the reservation

  @Column({ length: 50, default: 'Pending' })
  status: string; // Reservation status (e.g., Pending, Confirmed)

  @CreateDateColumn()
  createdAt: Date; // Timestamp of reservation creation
}
