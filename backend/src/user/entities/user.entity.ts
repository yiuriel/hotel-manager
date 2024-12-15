import { Hotel } from 'src/hotel/entities/hotel.entity';
import { MaintenanceRequest } from 'src/maintenance_request/entities/maintenance_request.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Shift, (shift) => shift.user)
  shifts: Shift[];

  @OneToMany(
    () => MaintenanceRequest,
    (maintenanceRequest) => maintenanceRequest.user,
  )
  maintenanceRequests: MaintenanceRequest[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => Hotel, (hotel) => hotel.users)
  hotel: Hotel;

  @ManyToOne(() => Organization, (organization) => organization.users, {
    nullable: true,
  })
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the hotel was added to the system

  @UpdateDateColumn()
  updatedAt: Date;
}
