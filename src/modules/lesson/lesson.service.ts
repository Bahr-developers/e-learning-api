import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { Lesson } from '@prisma/client';
import { MinioService } from '../../client';
import { CreateLessonInterface, UpdateLessonInterface } from './interfaces';

@Injectable()
export class LessonService {
  #_prisma: PrismaService;
  #_minio: MinioService;

  constructor(prisma: PrismaService, minio: MinioService) {
    this.#_prisma = prisma;
    this.#_minio = minio;
  }

  async createLesson(
    payload: CreateLessonInterface,
    userId: string,
  ): Promise<void> {
    await this.#_checkModule(payload.module_id);

    const video = await this.#_minio.uploadFile({
      file: payload.video,
      bucket: 'demo',
    });

    const newLesson = await this.#_prisma.lesson.create({
      data: {
        name: payload.name,
        number: Number(payload.number),
        lesson_details: payload.lesson_details,
        video_url: video.fileName,
        course_order: Number(payload.course_order),
        module_id: payload.module_id,
        user_id: 'c66607e5-69bf-4170-a199-dd7b99ae405a',
      },
    });

    await this.#_prisma.user_lesson.create({data:
    {
      user_id: "c66607e5-69bf-4170-a199-dd7b99ae405a",
      lesson_id: newLesson.id,
    }})
  }

  async getSingleLesson(id: string): Promise<Lesson> {
    await this.#_checkLesson(id);
    const data = await this.#_prisma.lesson.findFirst({ where: { id: id } });

    return data;
  }

  async getLessonList(): Promise<Lesson[]> {
    const data = await this.#_prisma.lesson.findMany();

    return data;
  }

  async updateLesson(payload: UpdateLessonInterface): Promise<void> {
    await this.#_checkLesson(payload.id);
    const updated_lesson = await this.#_prisma.lesson.findFirst({
      where: { id: payload.id },
    });
    if (payload.name) {
      await this.#_prisma.lesson.update({
        where: { id: payload.id },
        data: { name: payload.name },
      });
    }

    if (payload.number) {
      await this.#_prisma.lesson.update({
        where: { id: payload.id },
        data: { number: Number(payload.number) },
      });
    }

    if (payload.course_order) {
      await this.#_prisma.lesson.update({
        where: { id: payload.id },
        data: { course_order: Number(payload.course_order) },
      });
    }

    if (payload.is_preview_lesson) {
      await this.#_prisma.lesson.update({
        where: { id: payload.id },
        data: { is_preview_lesson: payload.is_preview_lesson },
      });
    }

    if (payload.lesson_details) {
      await this.#_prisma.lesson.update({
        where: { id: payload.id },
        data: { lesson_details: payload.lesson_details },
      });
    }

    if (payload.video) {
      await this.#_minio
        .removeFile({ fileName: updated_lesson.video_url })
        .catch((undefined) => undefined);
      const file = await this.#_minio.uploadFile({
        file: payload.video,
        bucket: 'demo',
      });
      await this.#_prisma.lesson.update({
        where: { id: payload.id },
        data: { video_url: file.fileName },
      });
    }
  }

  async deleteLesson(id: string): Promise<void> {
    await this.#_checkLesson(id);
    const deletedLesson = await this.#_prisma.lesson.findFirst({
      where: { id: id },
    });

    await this.#_minio
      .removeFile({ fileName: deletedLesson.video_url })
      .catch((undefined) => undefined);

    await this.#_prisma.lesson.delete({ where: { id: id } });
  }

  async searchLesson(name: string): Promise<Lesson[]> {
    const data = await this.getLessonList();

    let result = [];
    for (const lesson of data) {
      if (
        lesson.name
          .toString()
          .toLocaleLowerCase()
          .includes(name.toLocaleLowerCase())
      ) {
        result.push(lesson);
      }
    }
    return result;
  }

  async #_checkModule(id: string): Promise<void> {
    const module = await this.#_prisma.module.findFirst({ where: { id: id } });

    if (!module) {
      throw new ConflictException(`Module with ${id} is not exists`);
    }
  }

  async #_checkLesson(id: string): Promise<void> {
    const lesson = await this.#_prisma.lesson.findFirst({ where: { id: id } });

    if (!lesson) {
      throw new ConflictException(`Lesson with ${id} is not exists`);
    }
  }
}
