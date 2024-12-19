import { Organization } from 'src/organization/entities/organization.entity';
import { UserHasRole } from 'src/user_roles/user_has_role.entity';
import {
  Column,
  Entity,
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
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.roles, {
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @OneToMany(() => UserHasRole, (userHasRole) => userHasRole.role)
  userRoles: UserHasRole[];
}
