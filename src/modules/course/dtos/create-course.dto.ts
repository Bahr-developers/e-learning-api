import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCourseInterface } from '../interfaces';

export class CreateCourseDto implements CreateCourseInterface {
  @ApiProperty({
    example: 'Node.js Backend Kursi',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Judayam zor kurs',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: '100',
    required: true,
  })
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:true
  })
  landing_image: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:true
  })
  promo_video: any;

  @ApiProperty({
    required: true,
  })
  @IsString()
  category_id: string;
}
