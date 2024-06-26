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
import { Quiz } from '@prisma/client';
import { CreateQuizDto, UpdateQuizDto } from './dtos';
import { QuizService } from './quiz.service';

@ApiBearerAuth('JWT')
@ApiTags('Quiz')
@Controller({
  path: 'quiz',
  version: '1.0',
})
export class QuizController {
  #_service: QuizService;

  constructor(service: QuizService) {
    this.#_service = service;
  }

  @Get('find/all')
  async getQuizList(): Promise<Quiz[]> {
    return await this.#_service.getQuizList();
  }

  @Get('find/:id')
  async getSingleQuiz(@Param('id') quizId: string): Promise<Quiz> {
    return await this.#_service.getSingleQuiz(quizId);
  }

  @Get('find/:courseId')
  async getQuizbyCourseId(@Param('courseId') courseId: string): Promise<Quiz> {
    return await this.#_service.getQuizbyCourseId(courseId);
  }

  @Post('add')
  async createQuiz(@Body() payload: CreateQuizDto): Promise<void> {
    await this.#_service.createQuiz({ ...payload });
  }

  @Patch('edit/:id')
  async updateQuiz(
    @Param('id') quizId: string,
    @Body() payload: UpdateQuizDto,
  ): Promise<void> {
    await this.#_service.updateQuiz({ ...payload, id: quizId });
  }

  @Delete('delete/:id')
  async deleteQuiz(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteQuiz(id);
  }
}
