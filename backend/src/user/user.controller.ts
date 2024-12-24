import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionsGuard } from 'src/permission/permission.guard';
import { Permissions } from 'src/permission/permission.decorator';

@Controller('organization/:organizationId/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('update:user', 'update:permission')
  getAllOrgUsers(@Param('organizationId') organizationId: string) {
    return this.userService.getAllOrgUsers(organizationId);
  }
}
