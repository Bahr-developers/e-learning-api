import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCourseDto {
  @ApiProperty({
    example: 'Full Stack (Node.js, Vue.js)',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Full Stack kursi',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  is_progeress_limited?: boolean;

  @ApiProperty({
    example: '100',
    required: false,
  })
  @IsOptional()
  price?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required:false
  })
  @IsOptional()
  landing_image?: any;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false
  })
  @IsOptional()
  promo_video?: any;
}
