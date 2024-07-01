import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { quiz_question } from '@prisma/client';
import {
  CreateQuizQuestionInterface,
  UpdateQuizQuestionInterface,
} from './interfaces';

@Injectable()
export class QuizQuestionService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createQuizQuestion(
    payload: CreateQuizQuestionInterface,
  ): Promise<void> {
    await this.#_checkQuiz(payload.quiz_id);

    const newQuiz = await this.#_prisma.quiz_question.create({
      data: {
        title: payload.title,
        quiz_id: payload.quiz_id,
        ball: payload.ball,
      },
    });
  }

  async getSingleQuizQuestion(id: string): Promise<quiz_question> {
    await this.#_checkQuizQuestion(id);
    const data = await this.#_prisma.quiz_question.findFirst({
      where: { id: id },
    });

    return data;
  }

  async getQuizQuestionbyQuizId(quiz_id: string): Promise<quiz_question> {
    await this.#_checkQuiz(quiz_id);
    const data = await this.#_prisma.quiz_question.findFirst({
      where: { quiz_id: quiz_id },
    });

    return data;
  }

  async getQuizQuestionList(): Promise<quiz_question[]> {
    const data = await this.#_prisma.quiz_question.findMany();

    return data;
  }

  async updateQuizQuestion(
    payload: UpdateQuizQuestionInterface,
  ): Promise<void> {
    await this.#_checkQuizQuestion(payload.id);
    if (payload.title) {
      await this.#_prisma.quiz_question.update({
        where: { id: payload.id },
        data: { title: payload.title },
      });
    }
    if (payload.ball) {
      await this.#_prisma.quiz_question.update({
        where: { id: payload.id },
        data: { ball: payload.ball },
      });
    }
  }

  async deleteQuizQuestion(id: string): Promise<void> {
    await this.#_checkQuizQuestion(id);
    await this.#_prisma.quiz_question.delete({ where: { id: id } });
  }

  async #_checkQuizQuestion(id: string): Promise<void> {
    const quiz_question = await this.#_prisma.quiz_question.findFirst({
      where: { id: id },
    });

    if (!quiz_question) {
      throw new ConflictException(`Quiz question with ${id} is not exists`);
    }
  }

  async #_checkQuiz(id: string): Promise<void> {
    const quiz = await this.#_prisma.quiz.findFirst({ where: { id: id } });

    if (!quiz) {
      throw new ConflictException(`Quiz with ${id} is not exists`);
    }
  }
}
