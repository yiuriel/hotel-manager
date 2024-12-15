import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  /**
   * Users assigned to this role.
   */
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
