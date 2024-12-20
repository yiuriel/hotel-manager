import { Guest } from 'src/guest/entities/guest.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

// Represents reviews left by guests for hotels
@Entity()
export class GuestReview {
  @PrimaryGeneratedColumn('uuid')
  reviewId: string; // Unique identifier for each review

  @ManyToOne(() => Guest, (guest) => guest.guestId, { onDelete: 'CASCADE' })
  @JoinColumn()
  guest: Guest; // Guest who left the review

  @ManyToOne(() => Hotel, (hotel) => hotel.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel; // Hotel being reviewed

  @Column({ type: 'int', width: 1, default: 5 })
  rating: number; // Rating given by the guest (1-5)

  @Column('text', { nullable: true })
  comment: string; // Guest comments

  @CreateDateColumn()
  createdAt: Date; // Timestamp of review creation
}
