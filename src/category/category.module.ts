import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { PrismaModule } from 'src/prisma.module';
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
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
