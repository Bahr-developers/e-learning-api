import { Module } from '@nestjs/common';
import { MinioService } from '../../client';
import { PrismaService } from '../../prisma';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  controllers: [CourseController],
  providers: [PrismaService, CourseService, MinioService],
})
export class CourseModule {}
