import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuizQuestionInterface } from '../interfaces';

export class CreateQuizQuestionDto implements CreateQuizQuestionInterface {
  @ApiProperty({
    example: '2 + 2 = ',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  quiz_id: string;
}