import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { CreateCourseInterface, UpdateCourseInterface } from './interfaces';
import { Course } from '@prisma/client';
import { MinioService } from '../../client';

@Injectable()
export class CourseService {
  #_prisma: PrismaService;
  #_minio: MinioService;
  constructor(prisma: PrismaService, minio: MinioService) {
    this.#_prisma = prisma;
    this.#_minio = minio;
  }

  async createCourse(payload: CreateCourseInterface): Promise<void> {
    await this.#_checkCategory(payload.category_id);

    const image = await this.#_minio.uploadFile({
      file: payload.landing_image[0],
      bucket: 'demo',
    });

    const video = await this.#_minio.uploadFile({
      file: payload.promo_video[0],
      bucket: 'demo',
    });

    await this.#_prisma.course.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: Number(payload.price),
        landing_image: image.fileName,
        promo_video_url: video.fileName,
        category_id: payload.category_id,
        // createdBy: "4cd8db21-56e4-47c9-9b39-11ed856f4fcd"
      },
    });
  }

  async getSingleCourse(id: string): Promise<Course> {
    await this.#_checkCourse(id);
    const data = await this.#_prisma.course.findFirst({ where: { id: id } });

    return data;
  }

  async getCourseList(): Promise<Course[]> {
    const data = await this.#_prisma.course.findMany();

    return data;
  }

  async updateCourse(payload: UpdateCourseInterface): Promise<void> {
    await this.#_checkCourse(payload.id);
    const updated_course = await this.#_prisma.course.findFirst({
      where: { id: payload.id },
    });
    if (payload.name) {
      await this.#_prisma.course.update({
        where: { id: payload.id },
        data: { name: payload.name },
      });
    }

    if (payload.description) {
      await this.#_prisma.course.update({
        where: { id: payload.id },
        data: { description: payload.description },
      });
    }

    if (payload.price) {
      await this.#_prisma.course.update({
        where: { id: payload.id },
        data: { price: payload.price },
      });
    }

    if (payload.is_progress_limited) {
      await this.#_prisma.course.update({
        where: { id: payload.id },
        data: { is_progress_limited: payload.is_progress_limited },
      });
    }

    if (payload.landing_image) {
      await this.#_minio
        .removeFile({ fileName: updated_course.landing_image })
        .catch((undefined) => undefined);
      const file = await this.#_minio.uploadFile({
        file: payload.landing_image,
        bucket: 'demo',
      });
      await this.#_prisma.course.update({
        where: { id: payload.id },
        data: { landing_image: file.fileName },
      });
    }

    if (payload.promo_video) {
      await this.#_minio
        .removeFile({ fileName: updated_course.promo_video_url })
        .catch((undefined) => undefined);
      const file = await this.#_minio.uploadFile({
        file: payload.promo_video,
        bucket: 'demo',
      });
      await this.#_prisma.course.update({
        where: { id: payload.id },
        data: { promo_video_url: file.fileName },
      });
    }
  }

  async deleteCourse(id: string): Promise<void> {
    await this.#_checkCourse(id);
    const deletedCourse = await this.#_prisma.course.findFirst({
      where: { id: id },
    });

    await this.#_minio
      .removeFile({ fileName: deletedCourse.promo_video_url })
      .catch((undefined) => undefined);
    await this.#_minio
      .removeFile({ fileName: deletedCourse.landing_image })
      .catch((undefined) => undefined);

    await this.#_prisma.course.delete({ where: { id: id } });
  }

  async searchCourse(name: string): Promise<Course[]> {
    const data = await this.getCourseList();

    let result = [];
    for (const course of data) {
      if (
        course.name
          .toString()
          .toLocaleLowerCase()
          .includes(name.toLocaleLowerCase())
      ) {
        result.push(course);
      }
    }
    return result;
  }

  async #_checkCategory(id: string): Promise<void> {
    const category = await this.#_prisma.category.findFirst({
      where: { id: id },
    });

    if (!category) {
      throw new ConflictException(`Category with ${id} is not exists`);
    }
  }

  async #_checkCourse(id: string): Promise<void> {
    const course = await this.#_prisma.course.findFirst({ where: { id: id } });

    if (!course) {
      throw new ConflictException(`Course with ${id} is not exists`);
    }
  }
}
