import { Module } from '@nestjs/common';
import { MinioService } from '../../client';
import { PrismaService } from '../../prisma';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';

@Module({
  controllers: [LessonController],
  providers: [PrismaService, LessonService, MinioService],
})
export class LessonModule {}