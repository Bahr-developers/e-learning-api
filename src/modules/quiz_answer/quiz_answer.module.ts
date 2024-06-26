import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { QuizAnswerController } from './quiz_answer.controller';
import { QuizAnswerService } from './quiz_answer.service';

@Module({
  controllers: [QuizAnswerController],
  providers: [PrismaService, QuizAnswerService],
})
export class QuizAnswerModule {}