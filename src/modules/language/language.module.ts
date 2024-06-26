import { Module } from "@nestjs/common";
import { LanguageController } from "./language.controller";
import { LanguageService } from "./language.service";
import { MinioService } from "../../client";
import { PrismaService } from "../../prisma";

@Module({
  controllers: [LanguageController],
  providers: [PrismaService,LanguageService, MinioService]
})
export class LanguageModule {}