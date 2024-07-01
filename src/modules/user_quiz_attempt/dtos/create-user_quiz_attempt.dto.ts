import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserQuizAttemptInterface, UserAnswers } from '../interfaces';

export class CreateUserQuizAttemptDto implements CreateUserQuizAttemptInterface {
  @ApiProperty({
    example: [{'question_id': 'c66607e5-69bf-4170-a199-dd7b99ae405a', 'answer_id':'c66607e5-69bf-4170-a199-dd7b99ae405a'}],
    required: true,
  })
  @IsNotEmpty()
  answers: UserAnswers[];

  @ApiProperty({
    required: true,
  })
  @IsString()
  quiz_id: string;
}