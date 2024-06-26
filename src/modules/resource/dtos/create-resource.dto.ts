import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateResourceInterface } from '../interfaces';

export class CreateResourceDto implements CreateResourceInterface {
  @ApiProperty({
    example: 'Node.Jsga kirish',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'http://bahr-tech.uz',
    required: false,
  })
  @IsString()
  @IsOptional()
  link_url?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:false
  })
  @IsOptional()
  file?: any;

  @ApiProperty({
    required: true,
  })
  @IsString()
  lesson_id: string;
}
