import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma';
import { RoleController } from './role.controller';
import { Roleservice } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [PrismaService,Roleservice],
})
export class RoleModule {}