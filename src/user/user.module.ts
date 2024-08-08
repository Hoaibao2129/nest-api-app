import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
