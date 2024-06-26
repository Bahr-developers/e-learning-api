import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuizInterface } from '../interfaces';

export class CreateQuizDto implements CreateQuizInterface {
  @ApiProperty({
    example: 'Math',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Math description',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: '1',
    required: true,
  })
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    example: '50',
    required: true,
  })
  @IsNotEmpty()
  min_pas_score: number;

  @ApiProperty({
    type: 'number',
    required: true
  })
  @IsNotEmpty()
  course_order: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  course_id: string;
}