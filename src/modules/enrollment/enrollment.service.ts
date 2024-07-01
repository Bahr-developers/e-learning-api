import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { Enrollment } from '@prisma/client';
import { CreateEnrollmentInterface } from './interfaces';

@Injectable()
export class EnrollmentService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createEnrollment(payload: CreateEnrollmentInterface): Promise<void> {
    await this.#_checkCourse(payload.course_id);
    await this.#_checkUser(payload.user_id);

      await this.#_prisma.enrollment.create({
        data: {
          course_id: payload.course_id,
          user_id: payload.user_id,
        },
      });
  }

  async getSingleEnrollment(id: string): Promise<Enrollment> {
    await this.#_checkEnrollment(id);
    const data = await this.#_prisma.enrollment.findFirst({
      where: { id: id },
    });

    return data;
  }

  async getEnrollmentbyCourseId(course_id: string): Promise<Enrollment[]> {
    await this.#_checkCourse(course_id);
    const data = await this.#_prisma.enrollment.findMany({
      where: { course_id: course_id },
    });

    return data;
  }

  async getEnrollmentList(): Promise<Enrollment[]> {
    const data = await this.#_prisma.enrollment.findMany();

    return data;
  }

  async updateEnrollment(id: string): Promise<void> {
      await this.#_checkEnrollment(id)
      await this.#_prisma.enrollment.update({
        where: { id: id },
        data: { completed_time: new Date() },
      });
  }

  async deleteEnrollment(id: string): Promise<void> {
    await this.#_checkEnrollment(id);
    await this.#_prisma.enrollment.delete({ where: { id: id } });
  }

  async #_checkCourse(id: string): Promise<void> {
    const course = await this.#_prisma.course.findFirst({
      where: { id: id },
    });

    if (!course) {
      throw new ConflictException(`Course question with ${id} is not exists`);
    }
  }
  async #_checkEnrollment(id: string): Promise<void> {
    const enrollment = await this.#_prisma.enrollment.findFirst({
      where: { id: id },
    });

    if (!enrollment) {
      throw new ConflictException(`Enrollment with ${id} is not exists`);
    }
  }

  async #_checkUser(id: string): Promise<void> {
    const user = await this.#_prisma.user.findFirst({
      where: { id: id },
    });

    if (!user) {
      throw new ConflictException(`User with ${id} is not exists`);
    }
  }
}
