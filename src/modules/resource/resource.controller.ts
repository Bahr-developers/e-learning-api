import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Resource } from '@prisma/client';
import { UpdateResourceDto } from './dtos';
import { ResourceService } from './resource.service';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { CheckAuth, Permision } from '../../decorators';
import { PERMISSIONS } from '../../constants/permission.constants';

@ApiBearerAuth('JWT')
@ApiTags('Resource')
@Controller({
  path: 'resource',
  version: '1.0',
})
export class ResourceController {
  #_service: ResourceService;

  constructor(service: ResourceService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.resource.get_all_resources)
  @Get('find/all')
  async getResourceList(): Promise<Resource[]> {
    return await this.#_service.getResourceList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.resource.get_one_resource)
  @Get('find/:id')
  async getSingleResource(@Param('id') resourceId: string): Promise<Resource> {
    return await this.#_service.getSingleResource(resourceId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.resource.create_resource)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Post('add')
  async createResource(
    @Body() payload: CreateResourceDto,
    @UploadedFile() file: any,
  ): Promise<void> {
    await this.#_service.createResource({ ...payload, file });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.resource.update_resource)
  @ApiConsumes('multipart/form-data')
  @Patch('edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateResource(
    @Param('id') resourceId: string,
    @Body() payload: UpdateResourceDto,
    @UploadedFile() file: any,
  ): Promise<void> {
    await this.#_service.updateResource({
      ...payload,
      id: resourceId,
      file,
    });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.resource.delete_resource)
  @Delete('delete/:id')
  async deleteResource(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteResource(id);
  }
}
