import { Module } from '@nestjs/common';
import { MinioService } from '../../client';
import { PrismaService } from '../../prisma';
import { LanguageService } from '../language/language.service';
import { TranslateService } from '../translate/translate.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService, CategoryService, MinioService, TranslateService, LanguageService],
})
export class CategoryModule {}