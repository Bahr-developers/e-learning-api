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

  @Get('find/all')
  async getModuleList(): Promise<Module[]> {
    return await this.#_service.getModuleList();
  }

  @Get('find/:id')
  async getSingleModule(@Param('id') courseId: string): Promise<Module> {
    return await this.#_service.getSingleModule(courseId);
  }

  @Post('add')
  async createModule(@Body() payload: CreateModuleDto): Promise<void> {
    await this.#_service.createModule({ ...payload });
  }

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

  @Delete('delete/:id')
  async deleteModule(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteModule(id);
  }
}
