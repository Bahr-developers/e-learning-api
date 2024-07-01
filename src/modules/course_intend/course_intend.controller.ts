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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {course_intend } from '@prisma/client';
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
import { CourseIntendService } from './course_intend.service';
import { CreateCourseIntendDto, UpdateCourseIntendDto } from './dtos';

@ApiBearerAuth('JWT')
@ApiTags('CourseIntend')
@Controller({
  path: 'course_intend',
  version: '1.0',
})
export class CourseIntendController {
  #_service: CourseIntendService;

  constructor(service: CourseIntendService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.course_intend.get_all_course_intends)
  @Get('find/all')
  async getCourseIntendList(): Promise<course_intend[]> {
    return await this.#_service.getCourseIntendList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.course_intend.get_one_course_intend)
  @Get('find/:id')
  async getSingleCourseIntend(
    @Param('id') courseId: string,
  ): Promise<course_intend> {
    return await this.#_service.getSingleCourseIntend(courseId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.course_intend.create_course_intend)
  @Post('add')
  async createCourseIntend(
    @Body() payload: CreateCourseIntendDto,
    @Req() req: any,
  ): Promise<void> {
    await this.#_service.createCourseIntend({ ...payload });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.course_intend.edit_course_intend)
  @Patch('edit/:id')
  async updateCourseIntend(
    @Param('id') courseIntendId: string,
    @Body() payload: UpdateCourseIntendDto,
  ): Promise<void> {
    await this.#_service.updateCourseIntend({
      ...payload,
      id: courseIntendId,
    });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.course_intend.delete_course_intend)
  @Delete('delete/:id')
  async deleteCourseIntend(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteCourseIntend(id);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.course_intend.search_course_intend)
  @Get('/search')
  async searchCourseIntend(
    @Query('title') title: string,
  ): Promise<course_intend[]> {
    return await this.#_service.searchCourseIntend(title);
  }
}
