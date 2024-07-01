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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Lesson } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { LessonService } from './lesson.service';
import { CreateLessonDto, UpdateLessonDto } from './dtos';
import { CheckAuth, Permision } from '../../decorators';
import { PERMISSIONS } from '../../constants/permission.constants';

@ApiBearerAuth('JWT')
@ApiTags('Lesson')
@Controller({
  path: 'lesson',
  version: '1.0',
})
export class LessonController {
  #_service: LessonService;

  constructor(service: LessonService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.lesson.get_all_lessons)
  @Get('find/all')
  async getLessonList(): Promise<Lesson[]> {
    return await this.#_service.getLessonList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.lesson.get_one_lesson)
  @Get('find/:id')
  async getSingleLesson(@Param('id') lessonId: string): Promise<Lesson> {
    return await this.#_service.getSingleLesson(lessonId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.lesson.create_lesson)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @Post('add')
  async createLesson(
    @Body() payload: CreateLessonDto,
    @UploadedFile() video: any,
    @Req() req: any,
  ): Promise<void> {
    await this.#_service.createLesson({ ...payload, video }, req.userId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.lesson.edit_lesson)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('video'))
  @Patch('edit/:id')
  async updateCourse(
    @Param('id') lessonId: string,
    @Body() payload: UpdateLessonDto,
    @UploadedFile() video: any,
  ): Promise<void> {
    await this.#_service.updateLesson({ ...payload, id: lessonId, video });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.lesson.delete_lesson)
  @Delete('delete/:id')
  async deleteLesson(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteLesson(id);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.lesson.search_lesson)
  @Get('/search')
  async searchLesson(@Query('name') name: string): Promise<Lesson[]> {
    return await this.#_service.searchLesson(name);
  }
}
