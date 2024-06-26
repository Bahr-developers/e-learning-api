import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CourseIntendController } from './course_intend.controller';
import { CourseIntendService } from './course_intend.service';

@Module({
  controllers: [CourseIntendController],
  providers: [PrismaService, CourseIntendService],
})
export class CourseIntendModule {}
