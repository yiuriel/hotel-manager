import { Injectable } from '@nestjs/common';
import { PERMISSIONS_LIST } from './permission.constants';

@Injectable()
export class PermissionService {
  constructor() {}

  findAll() {
    return PERMISSIONS_LIST;
  }
}
