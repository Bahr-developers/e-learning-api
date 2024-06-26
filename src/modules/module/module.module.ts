import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';

@Module({
  controllers: [ModuleController],
  providers: [PrismaService, ModuleService],
})
export class ModuleModule {}