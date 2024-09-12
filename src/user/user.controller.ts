import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { isEmpty } from '../helper/checkEmptyData';
import { AuthGuard } from '../helper/auth.guard';
@Controller('users')
export class UserController {
  constructor(protected userService: UserService) {}

  @Post('')
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (isEmpty(createUserDto)) {
      throw new BadRequestException('User data can not be empty');
    }
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @UseGuards(AuthGuard)
  @Get('/:userId')
  async getUserById(@Param('userId') userId) {
    const userIdNumber = parseInt(userId);
    if (!isNaN(userIdNumber)) {
      return this.userService.getUserById(userIdNumber);
    } else {
      throw new Error('Invalid userId');
    }
  }
  @UseGuards(AuthGuard)
  @Put('')
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    if (!isEmpty(updateUserDto)) {
      throw new BadRequestException('User data can not be empty');
    }
    return this.userService.updateUser(updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('')
  async deleteUser(@Body('userId') userId) {
    if (isEmpty(userId)) {
      throw new BadRequestException('User data can not be empty');
    }
    return this.userService.deleteUser(+userId);
  }
}
