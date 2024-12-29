import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserOrganization(@Request() req: any) {
    return this.organizationService.getUserOrganization(req.user.id);
  }

  @Post()
  async createOrganization(
    @Body()
    body: {
      user: CreateUserDto;
      organization: CreateOrganizationDto;
    },
  ) {
    return this.organizationService.createOrganization(
      body.user,
      body.organization,
    );
  }
}
