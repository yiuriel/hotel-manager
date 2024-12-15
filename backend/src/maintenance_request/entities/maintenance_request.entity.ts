import { Room } from 'src/room/entities/room.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class MaintenanceRequest {
  @PrimaryGeneratedColumn('uuid')
  requestId: string; // Unique identifier for each request

  @ManyToOne(() => Room, (room) => room.maintenanceRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  room: Room; // Room requiring maintenance

  @ManyToOne(() => Staff, (staff) => staff.staffId)
  @JoinColumn()
  staff: Staff; // Staff member handling the request

  @Column('text')
  description: string; // Description of the issue

  @CreateDateColumn()
  requestDate: Date; // Timestamp of request creation

  @Column('timestamp', { nullable: true })
  completionDate: Date; // Timestamp of request completion

  @Column({ length: 50, default: 'Pending' })
  status: string; // Status of the request (e.g., Pending, Completed)
}
