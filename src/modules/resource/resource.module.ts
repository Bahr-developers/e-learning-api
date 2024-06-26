import { Module } from '@nestjs/common';
import { MinioService } from '../../client';
import { PrismaService } from '../../prisma';
import { ResourceController } from '../resource/resource.controller';
import { ResourceService } from '../resource/resource.service';

@Module({
  controllers: [ResourceController],
  providers: [PrismaService, ResourceService, MinioService],
})
export class ResourceModule {}
