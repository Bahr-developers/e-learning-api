import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateQuizInterface, UpdateQuizInterface } from '../interfaces';

export class UpdateQuizDto implements Omit<UpdateQuizInterface, 'id'> {
  @ApiProperty({
    example: 'Math',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Math description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '1',
    required: false,
  })
  @IsOptional()
  number?: number;

  @ApiProperty({
    example: '50',
    required: false,
  })
  @IsOptional()
  min_pas_score?: number;

  @ApiProperty({
    type: 'number',
    required: false
  })
  @IsOptional()
  course_order?: number;

  @ApiProperty({
    example:true,
    required: false,
  })
  @IsOptional()
  is_pass_required?: boolean;
}