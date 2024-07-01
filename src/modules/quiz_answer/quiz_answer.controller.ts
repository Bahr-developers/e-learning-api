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
import { quiz_answer } from '@prisma/client';
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
import { CreateQuizAnswerDto, UpdateQuizAnswerDto } from './dtos';
import { QuizAnswerService } from './quiz_answer.service';

@ApiBearerAuth('JWT')
@ApiTags('quiz_answer')
@Controller({
  path: 'quiz_answer',
  version: '1.0',
})
export class QuizAnswerController {
  #_service: QuizAnswerService;

  constructor(service: QuizAnswerService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_answer.get_all_quiz_answers)
  @Get('find/all')
  async getQuizAnswerList(): Promise<quiz_answer[]> {
    return await this.#_service.getQuizAnswerList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_answer.get_one_quiz_answer)
  @Get('find/:id')
  async getSingleQuizAnswer(
    @Param('id') quiz_answerId: string,
  ): Promise<quiz_answer> {
    return await this.#_service.getSingleQuizAnswer(quiz_answerId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_answer.get_one_quiz_answer_by_questionId)
  @Get('find/byquestion/:questionId')
  async getQuizAnswerbyQuestionId(
    @Param('questionId') questionId: string,
  ): Promise<quiz_answer> {
    return await this.#_service.getQuizAnswerbyQuestionId(questionId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_answer.create_quiz_answer)
  @Post('add')
  async createQuizAnswer(@Body() payload: CreateQuizAnswerDto): Promise<void> {
    await this.#_service.createQuizAnswer({ ...payload });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_answer.edit_quiz_answer)
  @Patch('edit/:id')
  async updateQuizAnswer(
    @Param('id') quiz_answerId: string,
    @Body() payload: UpdateQuizAnswerDto,
  ): Promise<void> {
    await this.#_service.updateQuizAnswer({ ...payload, id: quiz_answerId });
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.quiz_answer.delete_quiz_answer)
  @Delete('delete/:id')
  async deleteQuizAnswer(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteQuizAnswer(id);
  }
}
