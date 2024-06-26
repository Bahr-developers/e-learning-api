import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { course_intend } from '@prisma/client';
import {
  CreateCourseIntendInterface,
  UpdateCourseIntendInterface,
} from './interfaces';

@Injectable()
export class CourseIntendService {
  #_prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createCourseIntend(
    payload: CreateCourseIntendInterface,
  ): Promise<void> {
    await this.#_checkCourse(payload.course_id);

    await this.#_prisma.course_intend.create({
      data: {
        title: payload.title,
        course_id: payload.course_id,
      },
    });
  }

  async getSingleCourseIntend(id: string): Promise<course_intend> {
    await this.#_checkCourseIntend(id);
    const data = await this.#_prisma.course_intend.findFirst({
      where: { id: id },
    });

    return data;
  }

  async getCourseIntendList(): Promise<course_intend[]> {
    const data = await this.#_prisma.course_intend.findMany();

    return data;
  }

  async updateCourseIntend(
    payload: UpdateCourseIntendInterface,
  ): Promise<void> {
    await this.#_checkCourseIntend(payload.id);
    if (payload.title) {
      await this.#_prisma.course_intend.update({
        where: { id: payload.id },
        data: { title: payload.title },
      });
    }
  }

  async deleteCourseIntend(id: string): Promise<void> {
    await this.#_checkCourseIntend(id);
    await this.#_prisma.course_intend.delete({ where: { id: id } });
  }

  async searchCourseIntend(title: string): Promise<course_intend[]> {
    const data = await this.getCourseIntendList();

    let result = [];
    for (const course_intend of data) {
      if (
        course_intend.title
          .toString()
          .toLocaleLowerCase()
          .includes(title.toLocaleLowerCase())
      ) {
        result.push(course_intend);
      }
    }
    return result;
  }

  async #_checkCourseIntend(id: string): Promise<void> {
    const course_intend = await this.#_prisma.course_intend.findFirst({
      where: { id: id },
    });

    if (!course_intend) {
      throw new ConflictException(`Course Intend with ${id} is not exists`);
    }
  }

  async #_checkCourse(id: string): Promise<void> {
    const course = await this.#_prisma.course.findFirst({ where: { id: id } });

    if (!course) {
      throw new ConflictException(`Course with ${id} is not exists`);
    }
  }
}
