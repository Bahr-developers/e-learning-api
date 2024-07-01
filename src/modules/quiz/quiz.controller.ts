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
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
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

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz.get_all_quizes)
  @Get('find/all')
  async getQuizList(): Promise<Quiz[]> {
    return await this.#_service.getQuizList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz.get_one_quiz)
  @Get('find/:id')
  async getSingleQuiz(@Param('id') quizId: string): Promise<Quiz> {
    return await this.#_service.getSingleQuiz(quizId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz.get_quiz_by_courseId)
  @Get('find/bycourse/:courseId')
  async getQuizbyCourseId(@Param('courseId') courseId: string): Promise<Quiz> {
    return await this.#_service.getQuizbyCourseId(courseId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz.create_quiz)
  @Post('add')
  async createQuiz(@Body() payload: CreateQuizDto): Promise<void> {
    await this.#_service.createQuiz({ ...payload });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz.edit_quiz)
  @Patch('edit/:id')
  async updateQuiz(
    @Param('id') quizId: string,
    @Body() payload: UpdateQuizDto,
  ): Promise<void> {
    await this.#_service.updateQuiz({ ...payload, id: quizId });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz.delete_quiz)
  @Delete('delete/:id')
  async deleteQuiz(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteQuiz(id);
  }
}
