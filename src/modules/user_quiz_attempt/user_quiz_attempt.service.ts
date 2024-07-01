import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { user_quiz_attempt } from '@prisma/client';
import { PrismaService } from '../../prisma';
import { CreateUserQuizAttemptInterface } from './interfaces';

@Injectable()
export class UserQuizAttemptService {
  #_prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.#_prisma = prisma;
  }

  async createUserQuizAttempt(
    payload: CreateUserQuizAttemptInterface,
    userId: string,
  ): Promise<void> {
    await this.#_checkQuiz(payload.quiz_id);
    // await this.#_checkUser(payload.quiz_id);

    let ball = 0;

    for (const item of payload.answers) {
      await this.#_checkQuizQuestion(item.question_id);
      await this.#_checkAnswer(item.answer_id);

      const answer = await this.#_prisma.quiz_answer.findFirst({
        where: { id: item.answer_id },
      });

      const question = await this.#_prisma.quiz_question.findFirst({
        where: { id: item.question_id },
      });

      if (answer.is_correct == true) {
        if (answer.question_id == question.id) {
          ball += question.ball;
        } else {
          throw new BadRequestException('Something is wrong');
        }
      }
    }

    await this.#_prisma.user_quiz_attempt.create({
      data: {
        user_id: 'c66607e5-69bf-4170-a199-dd7b99ae405a',
        quiz_id: payload.quiz_id,
        score_achieved: ball,
      },
    });
  }

  async getSingleUserQuizAttempt(id: string): Promise<user_quiz_attempt> {
    await this.#_checkUserQuizAttempt(id);
    const data = await this.#_prisma.user_quiz_attempt.findFirst({
      where: { id: id },
    });

    return data;
  }

  async getUserQuizAttemptbyUserId(
    user_id: string,
  ): Promise<user_quiz_attempt[]> {
    await this.#_checkUser(user_id);
    const data = await this.#_prisma.user_quiz_attempt.findMany({
      where: { user_id: user_id },
    });

    return data;
  }

  async getUserQuizAttemptList(): Promise<user_quiz_attempt[]> {
    const data = await this.#_prisma.user_quiz_attempt.findMany();

    return data;
  }

  async deleteUserQuizAttempt(id: string): Promise<void> {
    await this.#_checkUserQuizAttempt(id);
    await this.#_prisma.user_quiz_attempt.delete({ where: { id: id } });
  }

  async #_checkQuizQuestion(id: string): Promise<void> {
    const quiz_question = await this.#_prisma.quiz_question.findFirst({
      where: { id: id },
    });

    if (!quiz_question) {
      throw new ConflictException(`Quiz question with ${id} is not exists`);
    }
  }

  async #_checkAnswer(id: string): Promise<void> {
    const answer = await this.#_prisma.quiz_answer.findFirst({
      where: { id: id },
    });

    if (!answer) {
      throw new ConflictException(`Answer with ${id} is not exists`);
    }
  }

  async #_checkQuiz(id: string): Promise<void> {
    const quiz = await this.#_prisma.quiz.findFirst({ where: { id: id } });

    if (!quiz) {
      throw new ConflictException(`Quiz with ${id} is not exists`);
    }
  }

  async #_checkUserQuizAttempt(id: string): Promise<void> {
    const user_quiz_attempt = await this.#_prisma.user_quiz_attempt.findFirst({
      where: { id: id },
    });

    if (!user_quiz_attempt) {
      throw new ConflictException(`User Quiz Attpemt with ${id} is not exists`);
    }
  }

  async #_checkUser(id: string): Promise<void> {
    const user = await this.#_prisma.user.findFirst({ where: { id: id } });

    if (!user) {
      throw new ConflictException(`User with ${id} is not exists`);
    }
  }
}
