import { Activity } from 'src/activity/entities/activity.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Room } from 'src/room/entities/room.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier for each hotel

  @Column({ length: 255 })
  name: string; // Hotel name

  @Column('text')
  address: string; // Hotel address

  @Column({ length: 100 })
  city: string; // City where the hotel is located

  @Column({ length: 100, nullable: true })
  state: string; // State/Province

  @Column({ length: 100 })
  country: string; // Country

  @Column({ length: 20, nullable: true })
  postalCode: string; // Postal code/ZIP

  @Column({ length: 20, nullable: true })
  phone: string; // Contact phone number

  @Column({ length: 100, nullable: true })
  email: string; // Contact email

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the hotel was added to the system

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[]; // List of rooms in the hotel

  @OneToMany(() => User, (user) => user.hotel)
  staff: User[]; // Staff associated with the hotel

  @OneToMany(() => Shift, (shift) => shift.hotel)
  shifts: Shift[];

  @OneToMany(() => Activity, (activity) => activity.hotel)
  activities: Activity[]; // Events hosted by the hotel

  @ManyToOne(() => Organization, (organization) => organization.hotels, {
    nullable: true,
  })
  organization: Organization;

  @Column('text', { nullable: true })
  threeDSchema: string; // JSON or binary representation of the 3D schema
  // Use formats like glTF or Draco to minimize storage space.
}
