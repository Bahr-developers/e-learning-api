import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateModuleInterface } from '../interfaces';

export class CreateModuleDto implements CreateModuleInterface {
  @ApiProperty({
    example: 'Something',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'N9',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  course_id: string;
}
