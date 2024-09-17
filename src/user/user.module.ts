import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
config();

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
