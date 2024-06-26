import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../prisma";

@Module({
  controllers: [AuthController],
  providers: [JwtService,PrismaService, AuthService]
})
export class AuthModule {}