import { Amenity } from 'src/amenity/entities/amenity.entity';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { MaintenanceRequest } from 'src/maintenance_request/entities/maintenance_request.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  roomId: string; // Unique identifier for each room

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, { onDelete: 'CASCADE' })
  @JoinColumn()
  hotel: Hotel; // Hotel this room belongs to

  @Column({ length: 10 })
  roomNumber: string; // Room number (e.g., 101, A1)

  @Column({ length: 50 })
  roomType: string; // Room type (e.g., Single, Suite)

  @Column()
  capacity: number; // Maximum capacity of the room

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerNight: number; // Cost per night

  @Column('text', { nullable: true })
  description: string; // Additional details about the room

  @Column({ default: true })
  isAvailable: boolean; // Indicates availability

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the room was added

  @ManyToMany(() => Amenity, (amenity) => amenity.rooms)
  @JoinTable()
  amenities: Amenity[]; // List of amenities for the room

  @OneToMany(() => MaintenanceRequest, (request) => request.room)
  maintenanceRequests: MaintenanceRequest[]; // Maintenance requests associated with this room

  @Column('text', { nullable: true })
  threeDSchema: string; // 3D schema for the room (compressed format)
}
