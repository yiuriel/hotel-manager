import { Reservation } from 'src/reservation/entities/reservation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn('uuid')
  guestId: string; // Unique identifier for each guest

  @Column({ length: 100 })
  firstName: string; // Guests first name

  @Column({ length: 100 })
  lastName: string; // Guests last name

  @Column({ length: 100, unique: true, nullable: true })
  email: string; // Email address

  @Column({ length: 20, nullable: true })
  phone: string; // Contact number

  @Column('text', { nullable: true })
  address: string; // Address of the guest

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the guest registered

  @OneToMany(() => Reservation, (reservation) => reservation.guest)
  reservations: Reservation[]; // Reservations made by the guest
}
