import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateEnrollmentInterface } from '../interfaces';

export class CreateEnrollmentDto implements CreateEnrollmentInterface {
  @ApiProperty({
    required: true,
  })
  @IsString()
  course_id: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  user_id: string;
}