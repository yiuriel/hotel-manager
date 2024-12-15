import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => User, (user) => user.maintenanceRequests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User; // Staff member handling the request

  @Column('text')
  description: string; // Description of the issue

  @CreateDateColumn()
  requestDate: Date; // Timestamp of request creation

  @Column('timestamp', { nullable: true })
  completionDate: Date; // Timestamp of request completion

  @Column({ length: 50, default: 'Pending' })
  status: string; // Status of the request (e.g., Pending, Completed)
}
