import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateEnrollmentInterface } from '../interfaces';

export class UpdateEnrollmentDto implements Omit<UpdateEnrollmentInterface, 'id'> {
  @ApiProperty({
    example: '664c9c8b45e6ceb3d325e013',
    required: false,
  })
  @IsOptional()
  @IsString()
  course_id?: string;

  @ApiProperty({
    example: '664c9c8b45e6ceb3d325e013',
    required: false,
  })
  @IsOptional()
  @IsString()
  user_id?: string;
}