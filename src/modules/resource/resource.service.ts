import { Resource } from '@prisma/client';
import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { MinioService } from './../../client/minio/minio.service';
import { CreateResourceInterface, UpdateResourceInterface } from './interfaces';

@Injectable()
export class ResourceService {
  #_prisma: PrismaService;
  #_minio: MinioService;

  constructor(prisma: PrismaService, minio: MinioService) {
    this.#_prisma = prisma;
    this.#_minio = minio;
  }

  async createResource(payload: CreateResourceInterface): Promise<void> {
    await this.checkExistingResource(payload.title);

    let file_url = '';

    if (payload.file) {
      const file = await this.#_minio.uploadFile({
        file: payload.file,
        bucket: 'demo',
      });
      file_url = file.fileName;
    }
    await this.#_checkLesson(payload.lesson_id);
    await this.#_prisma.resource.create({
      data: {
        title: payload.title,
        file_url: file_url,
        link_url: payload.link_url,
        lesson_id: payload.lesson_id,
      },
    });
  }

  async getSingleResource(id: string): Promise<Resource> {
    await this.checkResource(id);
    const data = await this.#_prisma.resource.findFirst({ where: { id: id } });

    return data;
  }

  async getResourceList(): Promise<Resource[]> {
    const data = await this.#_prisma.resource.findMany();

    return data;
  }

  async updateResource(payload: UpdateResourceInterface): Promise<void> {
    await this.checkResource(payload.id);
    const updated_resource = await this.#_prisma.resource.findFirst({
      where: { id: payload.id },
    });

    if (payload.title) {
      await this.#_prisma.resource.update({
        where: { id: payload.id },
        data: { title: payload.title },
      });
    }

    if (payload.link_url) {
      await this.#_prisma.resource.update({
        where: { id: payload.id },
        data: { link_url: payload.link_url },
      });
    }

    if (payload.file) {
      const deleteFile = await this.#_prisma.resource.findFirst({
        where: { id: payload.id },
      });
      await this.#_minio
        .removeFile({ fileName: deleteFile.file_url })
        .catch((undefined) => undefined);
      const file = await this.#_minio.uploadFile({
        file: payload.file,
        bucket: 'demo',
      });
      await this.#_prisma.resource.update({
        where: { id: payload.id },
        data: { file_url: file.fileName },
      });
    }
  }

  async deleteResource(id: string): Promise<void> {
    await this.checkResource(id);
    const deleteFile = await this.#_prisma.resource.findFirst({
      where: { id: id },
    });
    if (deleteFile.file_url) {
      await this.#_minio
        .removeFile({ fileName: deleteFile.file_url })
        .catch((undefined) => undefined);
    }
    await this.#_prisma.resource.delete({ where: { id: id } });
  }

  async #_checkLesson(id: string): Promise<void> {
    const lesson = await this.#_prisma.lesson.findFirst({ where: { id: id } });

    if (!lesson) {
      throw new ConflictException(`Lesson with ${id} is not exists`);
    }
  }

  async checkExistingResource(title: string): Promise<void> {
    const resource = await this.#_prisma.resource.findFirst({
      where: { title: title },
    });

    if (resource) {
      throw new ConflictException(
        `Resource with ${title} is already availabel`,
      );
    }
  }

  async checkResource(id: string): Promise<void> {
    console.log(id);

    const resource = await this.#_prisma.resource.findFirst({
      where: { id: id },
    });

    if (!resource) {
      throw new ConflictException(`Resource with ${id} is not available`);
    }
  }
}
