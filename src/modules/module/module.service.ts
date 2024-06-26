import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { Module } from '@prisma/client';
import { CreateModuleInterface, UpdateModuleInterface } from './interfaces';

@Injectable()
export class ModuleService {
  #_prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createModule(payload: CreateModuleInterface): Promise<void> {
    await this.#_checkCourse(payload.course_id);

    await this.#_prisma.module.create({
      data: {
        name: payload.name,
        number: payload.number,
        course_id: payload.course_id,
      },
    });
  }

  async getSingleModule(id: string): Promise<Module> {
    await this.#_checkModule(id);
    const data = await this.#_prisma.module.findFirst({ where: { id: id } });

    return data;
  }

  async getModuleList(): Promise<Module[]> {
    const data = await this.#_prisma.module.findMany();

    return data;
  }

  async updateModule(payload: UpdateModuleInterface): Promise<void> {
    await this.#_checkModule(payload.id);
    if (payload.name) {
      await this.#_prisma.module.update({
        where: { id: payload.id },
        data: { name: payload.name },
      });
    }

    if (payload.number) {
      await this.#_prisma.module.update({
        where: { id: payload.id },
        data: { number: payload.number },
      });
    }
  }

  async deleteModule(id: string): Promise<void> {
    await this.#_checkModule(id);
    await this.#_prisma.module.delete({ where: { id: id } });
  }

  async #_checkModule(id: string): Promise<void> {
    const modulee = await this.#_prisma.module.findFirst({ where: { id: id } });

    if (!modulee) {
      throw new ConflictException(`Module Intend with ${id} is not exists`);
    }
  }

  async #_checkCourse(id: string): Promise<void> {
    const course = await this.#_prisma.course.findFirst({ where: { id: id } });

    if (!course) {
      throw new ConflictException(`Course with ${id} is not exists`);
    }
  }
}
