import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLessonDto {
  @ApiProperty({
    example: 'Node.js Backend Kursi',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: '77',
    required: false,
  })
  @IsOptional()
  number?: number;

  @ApiProperty({
    example: '100',
    required: false,
  })
  @IsOptional()
  lesson_details?: string;

  @ApiProperty({
    type: 'number',
    required: false
  })
  @IsOptional()
  course_order?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:false
  })
  video?: any;

  @ApiProperty({
    required: false,
  })
  @IsString()
  module_id?: string;

  @ApiProperty({
    example:true,
    required: false
  })
  is_preview_lesson: boolean
}