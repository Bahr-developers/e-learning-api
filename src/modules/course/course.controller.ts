import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import { CourseService } from './course.service';
import { CreateCourseDto, UpdateCourseDto } from './dtos';
import {
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { FileType } from '../category/interfaces';

@ApiBearerAuth('JWT')
@ApiTags('Course')
@Controller({
  path: 'course',
  version: '1.0',
})
export class CourseController {
  #_service: CourseService;

  constructor(service: CourseService) {
    this.#_service = service;
  }

  @Get('find/all')
  async getCourseList(): Promise<Course[]> {
    return await this.#_service.getCourseList();
  }

  @Get('find/:id')
  async getSingleCourse(@Param('id') courseId: string): Promise<Course> {
    return await this.#_service.getSingleCourse(courseId);
  }

  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'landing_image' }, { name: 'promo_video' }]),
  )
  @Post('add')
  async createCourse(
    @Body() payload: CreateCourseDto,
    // @Req() req:any,
    @UploadedFiles() files: { landing_image: FileType; promo_video: FileType },
  ): Promise<void> {
    await this.#_service.createCourse({ ...payload, ...files });
  }

  @Patch('edit/:id')
  async updateCourse(
    @Param('id') courseId: string,
    @Body() payload: UpdateCourseDto,
  ): Promise<void> {
    await this.#_service.updateCourse({
      ...payload,
      id: courseId,
    });
  }

  @Delete('delete/:id')
  async deleteCourse(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteCourse(id);
  }

  @Get('/search')
  async searchCourse(@Query('name') name: string): Promise<Course[]> {
    return await this.#_service.searchCourse(name);
  }
}
