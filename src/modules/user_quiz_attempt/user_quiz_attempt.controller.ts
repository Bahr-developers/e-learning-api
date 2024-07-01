import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { user_quiz_attempt } from '@prisma/client';
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
import { CreateUserQuizAttemptDto } from './dtos';
import { CreateUserQuizAttemptInterface } from './interfaces';
import { UserQuizAttemptService } from './user_quiz_attempt.service';

@ApiBearerAuth('JWT')
@ApiTags('user_quiz_attempt')
@Controller({
  path: 'user_quiz_attempt',
  version: '1.0',
})
export class UserQuizAttemptController {
  #_service: UserQuizAttemptService;

  constructor(service: UserQuizAttemptService) {
    this.#_service = service;
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.user_quiz_attempt.get_all_user_quiz_attempts)
  @Get('find/all')
  async getUserQuizAttemptList(): Promise<user_quiz_attempt[]> {
    return await this.#_service.getUserQuizAttemptList();
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.user_quiz_attempt.get_one_user_quiz_attempt)
  @Get('find/:id')
  async getSingleUserQuizAttempt(
    @Param('id') user_quiz_attemptId: string,
  ): Promise<user_quiz_attempt> {
    return await this.#_service.getSingleUserQuizAttempt(user_quiz_attemptId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.user_quiz_attempt.get_user_quiz_attempt_by_userId)
  @Get('find/userId/:userId')
  async getUserQuizAttemptbyUserId(
    @Param('userId') userId: string,
  ): Promise<user_quiz_attempt[]> {
    return await this.#_service.getUserQuizAttemptbyUserId(userId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.user_quiz_attempt.create_user_quiz_attempt)
  @Post('add')
  async createUserQuizAttempt(
    @Body() payload: CreateUserQuizAttemptDto,
    @Req() req: any,
  ): Promise<void> {
    await this.#_service.createUserQuizAttempt({ ...payload }, req.userId);
  }

  @CheckAuth(false)
  @Permision(PERMISSIONS.user_quiz_attempt.delete_user_quiz_attempt)
  @Delete('delete/:id')
  async deleteUserQuizAttempt(@Param('id') id: string): Promise<void> {
    await this.#_service.deleteUserQuizAttempt(id);
  }
}
