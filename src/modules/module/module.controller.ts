import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Module } from '@prisma/client';
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
import { CreateModuleDto, UpdateModuleDto } from './dtos';
import { ModuleService } from './module.service';

@ApiBearerAuth('JWT')
@ApiTags('Module')
@Controller({
  path: 'module',
  version: '1.0',
})
export class ModuleController {
  #_service: ModuleService;

  constructor(service: ModuleService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.module.get_all_modules)
  @Get('find/all')
  async getModuleList(): Promise<Module[]> {
    return await this.#_service.getModuleList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.module.get_one_module)
  @Get('find/:id')
  async getSingleModule(@Param('id') courseId: string): Promise<Module> {
    return await this.#_service.getSingleModule(courseId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.module.create_module)
  @Post('add')
  async createModule(@Body() payload: CreateModuleDto): Promise<void> {
    await this.#_service.createModule({ ...payload });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.module.edit_module)
  @Patch('edit/:id')
  async updateModule(
    @Param('id') moduleId: string,
    @Body() payload: UpdateModuleDto,
  ): Promise<void> {
    await this.#_service.updateModule({
      ...payload,
      id: moduleId,
    });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.module.delete_module)
  @Delete('delete/:id')
  async deleteModule(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteModule(id);
  }
}
