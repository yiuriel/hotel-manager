import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { BaseRoleService } from 'src/role/util/base.role.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,

    private readonly dataSource: DataSource,

    private readonly authService: AuthService,

    private readonly baseRoleService: BaseRoleService,
  ) {}

  getUserOrganization(userId: string) {
    if (!userId) {
      return null;
    }

    return this.organizationRepository.findOne({
      where: {
        users: {
          id: userId,
        },
      },
    });
  }

  async createOrganization(
    user: CreateUserDto,
    organizationData: CreateOrganizationDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existingUser = await queryRunner.manager
        .getRepository(User)
        .findOne({
          where: { email: user.email },
        });

      if (existingUser) {
        throw new Error('User already exists');
      }

      const organization = queryRunner.manager.create(Organization, {
        ...organizationData,
      });

      const roles = await this.baseRoleService.createBaseRoles();

      await queryRunner.manager.save(roles);

      const { password, ...userWithoutPassword } = user;
      const passwordHash = await argon2.hash(password);

      const newUser = queryRunner.manager.create(User, {
        ...userWithoutPassword,
        passwordHash: passwordHash,
        roleId: roles[0].id,
        organization: {
          id: organization.id,
        },
      });

      newUser.role = roles[0];

      organization.users = [newUser];
      organization.owner = newUser;
      organization.roles = roles;

      await queryRunner.manager.save(newUser);
      // await queryRunner.manager.save(roles);
      await queryRunner.manager.save(organization);

      await queryRunner.commitTransaction();

      const token = await this.authService.login(
        {
          email: user.email,
          password,
        },
        response,
      );

      if (!token) {
        throw new Error('Failed to login');
      }

      return organization;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
