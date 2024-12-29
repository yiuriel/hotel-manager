import { Organization } from 'src/organization/entities/organization.entity';
import { Permission } from 'src/permission/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  /**
   * Unique identifier for the role.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the role (e.g., Admin, Manager, Staff).
   */
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  editable: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @ManyToOne(() => Organization, (organization) => organization.roles, {
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @ManyToMany(() => Permission, { eager: true })
  @JoinTable({
    name: 'role_permission',
  })
  permissions: Permission[]; // Permissions assigned to the role
}
