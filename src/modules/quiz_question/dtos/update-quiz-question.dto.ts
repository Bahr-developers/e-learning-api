import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateQuizQuestionInterface } from '../interfaces';

export class UpdateQuizQuestionDto implements Omit<UpdateQuizQuestionInterface, 'id'> {
  @ApiProperty({
    example: '2 + 3 = ',
    required: true,
  })
  @IsOptional()
  @IsString()
  title: string;
}