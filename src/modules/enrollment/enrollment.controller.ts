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
  import { Enrollment } from '@prisma/client';
import { PERMISSIONS } from '../../constants/permission.constants';
import { CheckAuth, Permision } from '../../decorators';
import { CreateEnrollmentDto } from './dtos';
import { EnrollmentService } from './enrollment.service';
  
  @ApiBearerAuth('JWT')
  @ApiTags('Enrollment')
  @Controller({
    path: 'enrollment',
    version: '1.0',
  })
  export class EnrollmentController {
    #_service: EnrollmentService;
  
    constructor(service: EnrollmentService) {
      this.#_service = service;
    }
  
    @CheckAuth(false)
    @Permision(PERMISSIONS.enrollment.get_all_enrollments)
    @Get('find/all')
    async getEnrollmentList(): Promise<Enrollment[]> {
      return await this.#_service.getEnrollmentList();
    }
  
    @CheckAuth(false)
    @Permision(PERMISSIONS.enrollment.get_one_enrollment)
    @Get('find/:id')
    async getSingleEnrollment(
      @Param('id') enrollmentId: string,
    ): Promise<Enrollment> {
      return await this.#_service.getSingleEnrollment(enrollmentId);
    }
  
    @CheckAuth(false)
    @Permision(PERMISSIONS.enrollment.get_enrollment_by_courseId)
    @Get('find/bycourse/:courseId')
    async getEnrollmentbyCourseId(
      @Param('courseId') courseId: string,
    ): Promise<Enrollment[]> {
      return await this.#_service.getEnrollmentbyCourseId(courseId);
    }
  
    @CheckAuth(false)
    @Permision(PERMISSIONS.enrollment.create_enrollment)
    @Post('add')
    async createEnrollment(@Body() payload: CreateEnrollmentDto): Promise<void> {
      await this.#_service.createEnrollment({ ...payload });
    }
  
    @CheckAuth(false)
    @Permision(PERMISSIONS.enrollment.edit_enrollment)
    @Patch('edit/:id')
    async updateEnrollment(
      @Param('id') enrollmentId: string,
    ): Promise<void> {
      await this.#_service.updateEnrollment(enrollmentId);
    }
  
    @CheckAuth(false)
    @Permision(PERMISSIONS.enrollment.delete_enrollment)
    @Delete('delete/:id')
    async deleteEnrollment(@Param('id') id: string): Promise<void> {
      await this.#_service.deleteEnrollment(id);
    }
  }
  