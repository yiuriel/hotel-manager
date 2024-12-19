import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  /**
   * The owner of the organization (a user with special privileges).
   */
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  owner: User;

  @OneToMany(() => Role, (role) => role.organization)
  roles: Role[];

  /**
   * List of users associated with the organization.
   */
  @OneToMany(() => User, (user) => user.organization)
  users: User[];

  @OneToMany(() => Hotel, (hotel) => hotel.organization)
  hotels: Hotel[];
}
