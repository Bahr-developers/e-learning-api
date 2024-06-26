import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { quiz_answer } from '@prisma/client';
import {
  CreateQuizAnswerInterface,
  UpdateQuizAnswerInterface,
} from './interfaces';

@Injectable()
export class QuizAnswerService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createQuizAnswer(payload: CreateQuizAnswerInterface): Promise<void> {
    await this.#_checkQuizQuestion(payload.question_id);

    if (payload.is_correct) {
      await this.#_prisma.quiz_answer.create({
        data: {
          answer_text: payload.answer_text,
          question_id: payload.question_id,
          is_correct: payload.is_correct,
        },
      });
    } else {
      await this.#_prisma.quiz_answer.create({
        data: {
          answer_text: payload.answer_text,
          question_id: payload.question_id,
        },
      });
    }
  }

  async getSingleQuizAnswer(id: string): Promise<quiz_answer> {
    await this.#_checkQuizAnswer(id);
    const data = await this.#_prisma.quiz_answer.findFirst({
      where: { id: id },
    });

    return data;
  }

  async getQuizAnswerbyQuestionId(question_id: string): Promise<quiz_answer> {
    await this.#_checkQuizQuestion(question_id);
    const data = await this.#_prisma.quiz_answer.findFirst({
      where: { question_id: question_id },
    });

    return data;
  }

  async getQuizAnswerList(): Promise<quiz_answer[]> {
    const data = await this.#_prisma.quiz_answer.findMany();

    return data;
  }

  async updateQuizAnswer(payload: UpdateQuizAnswerInterface): Promise<void> {
    await this.#_checkQuizAnswer(payload.id);
    if (payload.answer_text) {
      await this.#_prisma.quiz_answer.update({
        where: { id: payload.id },
        data: { answer_text: payload.answer_text },
      });
    }

    if (payload.is_correct.toString().length) {
      await this.#_prisma.quiz_answer.update({
        where: { id: payload.id },
        data: { is_correct: payload.is_correct },
      });
    }
  }

  async deleteQuizAnswer(id: string): Promise<void> {
    await this.#_checkQuizAnswer(id);
    await this.#_prisma.quiz_answer.delete({ where: { id: id } });
  }

  async #_checkQuizQuestion(id: string): Promise<void> {
    const quiz_question = await this.#_prisma.quiz_question.findFirst({
      where: { id: id },
    });

    if (!quiz_question) {
      throw new ConflictException(`Quiz question with ${id} is not exists`);
    }
  }

  async #_checkQuizAnswer(id: string): Promise<void> {
    const answer = await this.#_prisma.quiz_answer.findFirst({
      where: { id: id },
    });

    if (!answer) {
      throw new ConflictException(`Answer with ${id} is not exists`);
    }
  }
}
