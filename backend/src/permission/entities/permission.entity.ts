import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PermissionType } from '../permission.constants';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: PermissionType; // e.g., "READ_USERS", "CREATE_HOTELS"
}
