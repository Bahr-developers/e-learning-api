import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { Quiz } from '@prisma/client';
import { CreateQuizInterface, UpdateQuizInterface } from './interfaces';

@Injectable()
export class QuizService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createQuiz(payload: CreateQuizInterface): Promise<void> {
    await this.#_checkCourse(payload.course_id);

    const newQuiz = await this.#_prisma.quiz.create({
      data: {
        name: payload.name,
        description: payload.description,
        number: Number(payload.number),
        min_pas_score: Number(payload.min_pas_score),
        course_order: Number(payload.course_order),
        course_id: payload.course_id,
      },
    });
  }

  async getSingleQuiz(id: string): Promise<Quiz> {
    await this.#_checkQuiz(id);
    const data = await this.#_prisma.quiz.findFirst({ where: { id: id } });

    return data;
  }

  async getQuizbyCourseId(course_id: string): Promise<Quiz> {
    await this.#_checkCourse(course_id);
    const data = await this.#_prisma.quiz.findFirst({
      where: { course_id: course_id },
    });

    return data;
  }

  async getQuizList(): Promise<Quiz[]> {
    const data = await this.#_prisma.quiz.findMany();

    return data;
  }

  async updateQuiz(payload: UpdateQuizInterface): Promise<void> {
    await this.#_checkQuiz(payload.id);
    const updated_quiz = await this.#_prisma.quiz.findFirst({
      where: { id: payload.id },
    });
    if (payload.name) {
      await this.#_prisma.quiz.update({
        where: { id: payload.id },
        data: { name: payload.name },
      });
    }

    if (payload.description) {
      await this.#_prisma.quiz.update({
        where: { id: payload.id },
        data: { description: payload.description },
      });
    }

    if (payload.number) {
      await this.#_prisma.quiz.update({
        where: { id: payload.id },
        data: { number: Number(payload.number) },
      });
    }

    if (payload.course_order) {
      await this.#_prisma.quiz.update({
        where: { id: payload.id },
        data: { course_order: Number(payload.course_order) },
      });
    }

    if (payload.min_pas_score) {
      await this.#_prisma.quiz.update({
        where: { id: payload.id },
        data: { min_pas_score: Number(payload.min_pas_score) },
      });
    }

    if (payload.is_pass_required) {
      await this.#_prisma.quiz.update({
        where: { id: payload.id },
        data: { is_pass_required: payload.is_pass_required },
      });
    }
  }

  async deleteQuiz(id: string): Promise<void> {
    await this.#_checkQuiz(id);
    const deletedQuiz = await this.#_prisma.quiz.findFirst({
      where: { id: id },
    });

    await this.#_prisma.quiz.delete({ where: { id: id } });
  }

  async #_checkCourse(id: string): Promise<void> {
    const course = await this.#_prisma.course.findFirst({ where: { id: id } });

    if (!course) {
      throw new ConflictException(`Course with ${id} is not exists`);
    }
  }

  async #_checkQuiz(id: string): Promise<void> {
    const quiz = await this.#_prisma.quiz.findFirst({ where: { id: id } });

    if (!quiz) {
      throw new ConflictException(`Quiz with ${id} is not exists`);
    }
  }
}
