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

  @Get('find/all')
  async getCourseIntendList(): Promise<course_intend[]> {
    return await this.#_service.getCourseIntendList();
  }

  @Get('find/:id')
  async getSingleCourseIntend(
    @Param('id') courseId: string,
  ): Promise<course_intend> {
    return await this.#_service.getSingleCourseIntend(courseId);
  }

  @Post('add')
  async createCourseIntend(
    @Body() payload: CreateCourseIntendDto,
    @Req() req: any,
  ): Promise<void> {
    await this.#_service.createCourseIntend({ ...payload });
  }

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

  @Delete('delete/:id')
  async deleteCourseIntend(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteCourseIntend(id);
  }

  @Get('/search')
  async searchCourseIntend(
    @Query('title') title: string,
  ): Promise<course_intend[]> {
    return await this.#_service.searchCourseIntend(title);
  }
}
