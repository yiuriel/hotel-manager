import { Hotel } from 'src/hotel/entities/hotel.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  eventId: string; // Unique identifier for each event

  @ManyToOne(() => Hotel, (hotel) => hotel.activities, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel; // Hotel hosting the event

  @Column({ length: 255 })
  name: string; // Event name

  @Column('timestamp')
  date: Date; // Date of the event

  @Column('text', { nullable: true })
  description: string; // Description of the event

  @CreateDateColumn()
  createdAt: Date; // Timestamp of event creation
}
