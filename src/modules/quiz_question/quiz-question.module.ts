import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { QuizQuestionController } from './quiz-question.controller';
import { QuizQuestionService } from './quiz-question.service';

@Module({
  controllers: [QuizQuestionController],
  providers: [PrismaService, QuizQuestionService],
})
export class QuizQuestionModule {}