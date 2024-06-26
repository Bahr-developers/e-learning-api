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

  @Get('find/all')
  async getLessonList(): Promise<Lesson[]> {
    return await this.#_service.getLessonList();
  }

  @Get('find/:id')
  async getSingleLesson(@Param('id') lessonId: string): Promise<Lesson> {
    return await this.#_service.getSingleLesson(lessonId);
  }

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

  @Delete('delete/:id')
  async deleteLesson(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteLesson(id);
  }

  @Get('/search')
  async searchLesson(@Query('name') name: string): Promise<Lesson[]> {
    return await this.#_service.searchLesson(name);
  }
}
