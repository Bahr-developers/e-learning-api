import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateResourceInterface } from '../interfaces';

export class UpdateResourceDto implements Omit<UpdateResourceInterface, 'id'> {
  @ApiProperty({
    example: 'Node.Jsga kirish',
    required: false,
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiProperty({
    example: 'http://bahr-tech.uz',
    required: false,
  })
  @IsOptional()
  @IsString()
  link_url: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:false
  })
  @IsOptional()
  file?: any;
}
