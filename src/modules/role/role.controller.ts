import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roleservice } from './role.service';
import { Role } from '@prisma/client';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CheckAuth, Permision } from '../../decorators';
import { PERMISSIONS } from '../../constants/permission.constants';

@ApiBearerAuth('JWT')
@ApiTags('Roles')
@Controller('role')
export class RoleController {
  #_service: Roleservice;

  constructor(service: Roleservice) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.roles.get_all_roles)
  @Get('find/all')
  async getRoleList(): Promise<Role[]> {
    return await this.#_service.getRoleList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.roles.create_roles)
  @Post('/add')
  async createRole(@Body() payload: CreateRoleDto): Promise<void> {
    await this.#_service.createRole(payload);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.roles.edit_roles)
  @Patch('/edit/:id')
  async updateRole(
    @Param('id') id: string,
    @Body() payload: UpdateRoleDto,
  ): Promise<void> {
    await this.#_service.updateRole({ id: id, ...payload });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.roles.delete_roles)
  @Delete('/delete/:id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteRole(id);
  }
}
