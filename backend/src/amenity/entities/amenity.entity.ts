import { Room } from 'src/room/entities/room.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn('uuid')
  amenityId: string; // Unique identifier for each amenity

  @Column({ length: 100 })
  name: string; // Name of the amenity (e.g., Wi-Fi, TV)

  @Column('text', { nullable: true })
  description: string; // Description of the amenity

  @CreateDateColumn()
  createdAt: Date; // Timestamp of record creation

  @ManyToMany(() => Room, (room) => room.amenities)
  rooms: Room[]; // Rooms that have this amenity
}
