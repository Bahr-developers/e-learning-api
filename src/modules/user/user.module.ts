import { Module } from '@nestjs/common';
import { MinioService } from '../../client';
import { PrismaService } from '../../prisma';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService, MinioService],
})
export class UserModule {}