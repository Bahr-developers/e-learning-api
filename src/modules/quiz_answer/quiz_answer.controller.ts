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

  @Get('find/all')
  async getQuizAnswerList(): Promise<quiz_answer[]> {
    return await this.#_service.getQuizAnswerList();
  }

  @Get('find/:id')
  async getSingleQuizAnswer(
    @Param('id') quiz_answerId: string,
  ): Promise<quiz_answer> {
    return await this.#_service.getSingleQuizAnswer(quiz_answerId);
  }

  @Get('find/:quizId')
  async getQuizAnswerbyQuestionId(
    @Param('questionId') questionId: string,
  ): Promise<quiz_answer> {
    return await this.#_service.getQuizAnswerbyQuestionId(questionId);
  }

  @Post('add')
  async createQuizAnswer(@Body() payload: CreateQuizAnswerDto): Promise<void> {
    await this.#_service.createQuizAnswer({ ...payload });
  }

  @Patch('edit/:id')
  async updateQuizAnswer(
    @Param('id') quiz_answerId: string,
    @Body() payload: UpdateQuizAnswerDto,
  ): Promise<void> {
    await this.#_service.updateQuizAnswer({ ...payload, id: quiz_answerId });
  }

  @Delete('delete/:id')
  async deleteQuizAnswer(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteQuizAnswer(id);
  }
}
