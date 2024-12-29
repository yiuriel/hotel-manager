import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrganizationService } from './organization.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Response } from 'express';

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
    @Res() res: Response,
  ) {
    const organization = await this.organizationService.createOrganization(
      body.user,
      body.organization,
      res,
    );

    console.log('controller organization', organization);

    return res.json(organization);
  }
}
