import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLessonInterface } from '../interfaces';

export class CreateLessonDto implements CreateLessonInterface {
  @ApiProperty({
    example: 'Node.js Backend Kursi',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '77',
    required: true,
  })
  @IsNotEmpty()
  number: number;

  @ApiProperty({
    example: '100',
    required: true,
  })
  @IsNotEmpty()
  lesson_details: string;

  @ApiProperty({
    type: 'number',
    required: true
  })
  @IsNotEmpty()
  course_order: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:true
  })
  video: any;

  @ApiProperty({
    required: true,
  })
  @IsString()
  module_id: string;
}