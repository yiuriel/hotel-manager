import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async createUser(email: string, passwordHash: string) {
    const user = this.userRepository.create({ email, passwordHash });
    return this.userRepository.save(user);
  }

  async clearAll() {
    return this.userRepository.remove(await this.userRepository.find());
  }
}
