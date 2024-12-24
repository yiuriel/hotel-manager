import { Hotel } from 'src/hotel/entities/hotel.entity';
import { MaintenanceRequest } from 'src/maintenance_request/entities/maintenance_request.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { Role } from 'src/role/entities/role.entity';
import { Shift } from 'src/shift/entities/shift.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.staff)
  @JoinColumn({ name: 'hotel_id' })
  hotel: Hotel;

  @ManyToMany(() => Shift, (shift) => shift.users)
  @JoinTable({
    name: 'user_shift',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'shift_id', referencedColumnName: 'id' },
  })
  shifts: Shift[];

  @OneToMany(
    () => MaintenanceRequest,
    (maintenanceRequest) => maintenanceRequest.user,
  )
  maintenanceRequests: MaintenanceRequest[];

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization;

  @CreateDateColumn()
  createdAt: Date; // Timestamp of when the hotel was added to the system

  @UpdateDateColumn()
  updatedAt: Date;
}
