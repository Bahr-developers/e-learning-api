import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateQuizAnswerInterface } from '../interfaces';

export class UpdateQuizAnswerDto
  implements Omit<UpdateQuizAnswerInterface, 'id'>
{
  @ApiProperty({
    example: '4',
    required: false,
  })
  @IsOptional()
  @IsString()
  answer_text?: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  is_correct?: boolean;
}
