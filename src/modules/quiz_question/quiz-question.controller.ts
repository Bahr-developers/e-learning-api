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
import { quiz_question } from '@prisma/client';
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
import { CreateQuizQuestionDto, UpdateQuizQuestionDto } from './dtos';
import { QuizQuestionService } from './quiz-question.service';

@ApiBearerAuth('JWT')
@ApiTags('quiz_question')
@Controller({
  path: 'quiz_question',
  version: '1.0',
})
export class QuizQuestionController {
  #_service: QuizQuestionService;

  constructor(service: QuizQuestionService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_question.get_all_quiz_questions)
  @Get('find/all')
  async getQuizQuestionList(): Promise<quiz_question[]> {
    return await this.#_service.getQuizQuestionList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_question.get_one_quiz_question)
  @Get('find/:id')
  async getSingleQuizQuestion(
    @Param('id') quiz_questionId: string,
  ): Promise<quiz_question> {
    return await this.#_service.getSingleQuizQuestion(quiz_questionId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_question.get_one_quiz_question_by_quizId)
  @Get('find/byquiz/:quizId')
  async getQuizQuestionbyQuizId(
    @Param('quizId') quizId: string,
  ): Promise<quiz_question> {
    return await this.#_service.getQuizQuestionbyQuizId(quizId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_question.create_quiz_question)
  @Post('add')
  async createQuizQuestion(
    @Body() payload: CreateQuizQuestionDto,
  ): Promise<void> {
    await this.#_service.createQuizQuestion({ ...payload });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_question.edit_quiz_question)
  @Patch('edit/:id')
  async updateQuiz(
    @Param('id') quiz_questionId: string,
    @Body() payload: UpdateQuizQuestionDto,
  ): Promise<void> {
    await this.#_service.updateQuizQuestion({
      ...payload,
      id: quiz_questionId,
    });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_question.delete_quiz_question)
  @Delete('delete/:id')
  async deleteQuizQuestion(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteQuizQuestion(id);
  }
}
