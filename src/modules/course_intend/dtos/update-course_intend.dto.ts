import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseIntendDto {
  @ApiProperty({
    example: 'Vue.Js FrontEnd',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;
}
