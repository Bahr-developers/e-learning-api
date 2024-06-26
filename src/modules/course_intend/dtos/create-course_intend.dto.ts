import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCourseIntendInterface } from '../interfaces';

export class CreateCourseIntendDto implements CreateCourseIntendInterface {
  @ApiProperty({
    example: 'Node.Js Backend',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  course_id: string;
}
