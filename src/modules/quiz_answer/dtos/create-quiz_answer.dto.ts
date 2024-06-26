import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuizAnswerInterface } from '../interfaces';

export class CreateQuizAnswerDto implements CreateQuizAnswerInterface {
  @ApiProperty({
    example: '4',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  answer_text: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  question_id: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  is_correct?: boolean;
}