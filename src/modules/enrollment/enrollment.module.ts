import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentService } from './enrollment.service';

@Module({
  controllers: [EnrollmentController],
  providers: [PrismaService, EnrollmentService],
})
export class EnrollmentModule {}