import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Permissions } from 'src/permission/permission.decorator';
import { PermissionsGuard } from 'src/permission/permission.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('organization/:organizationId/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('create:user')
  createOrganizationUser(
    @Param('organizationId') organizationId: string,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.createOrganizationUser(
      organizationId,
      createUserDto,
    );
  }

  @Get()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('read:user')
  getAllOrgUsers(@Param('organizationId') organizationId: string) {
    return this.userService.getAllOrgUsers(organizationId);
  }

  @Patch(':userId/permission')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('update:user', 'update:role', 'update:permission')
  updateUserPermissions(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @Body() updatedPermissions: { permissions: string[] },
  ) {
    return this.userService.updateUserPermissions(
      organizationId,
      userId,
      updatedPermissions.permissions,
    );
  }

  @Get(':userId/shift')
  @UseGuards(AuthGuard)
  getUserShifts(
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ) {
    return this.userService.getAllUserShifts(userId, organizationId);
  }
}
