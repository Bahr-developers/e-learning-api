import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { UserQuizAttemptController } from './user_quiz_attempt.controller';
import { UserQuizAttemptService } from './user_quiz_attempt.service';

@Module({
  controllers: [UserQuizAttemptController],
  providers: [PrismaService, UserQuizAttemptService],
})
export class UserQuizAttemptModule {}