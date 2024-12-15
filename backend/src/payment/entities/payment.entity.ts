import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

// Represents payments made for reservations
@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  paymentId: string; // Unique identifier for each payment

  @ManyToOne(() => Reservation, (reservation) => reservation.reservationId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  reservation: Reservation; // Reservation associated with the payment

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number; // Amount paid

  @Column({ length: 50 })
  paymentMethod: string; // Payment method (e.g., Credit Card)

  @CreateDateColumn()
  paymentDate: Date; // Timestamp of the payment

  @Column({ length: 50, default: 'Completed' })
  status: string; // Payment status (e.g., Completed, Failed)
}
