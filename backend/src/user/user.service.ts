import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Permission } from 'src/permission/entities/permission.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  getAllOrgUsers(organizationId: string) {
    return plainToInstance(
      UserDto,
      this.userRepository.find({
        where: { organization: { id: organizationId } },
        relations: { role: { permissions: true }, permissions: true },
      }),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string) {
    return plainToInstance(
      UserDto,
      this.userRepository.findOne({
        where: { id },
        relations: {
          role: {
            permissions: true,
          },
          shifts: true,
          permissions: true,
        },
      }),
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async updateUserPermissions(
    organizationId: string,
    userId: string,
    permissions: string[],
  ) {
    const dbUser = await this.userRepository.findOne({
      where: { id: userId, organization: { id: organizationId } },
      relations: ['permissions'],
      select: { id: true, permissions: { id: true, name: true } },
    });

    if (!dbUser) {
      throw new NotFoundException('User not found');
    }

    const dbPermissions = await this.permissionRepository.findBy({
      name: In(permissions),
    });

    dbUser.permissions = dbPermissions;
    await this.userRepository.save(dbUser, { reload: false });

    return { ok: true, message: 'Permissions updated successfully' };
  }

  async createUser(email: string, passwordHash: string) {
    const user = this.userRepository.create({ email, passwordHash });
    return this.userRepository.save(user);
  }

  async clearAll() {
    return this.userRepository.remove(await this.userRepository.find());
  }
}
