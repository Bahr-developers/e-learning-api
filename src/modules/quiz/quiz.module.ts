import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  controllers: [QuizController],
  providers: [PrismaService, QuizService],
})
export class QuizModule {}