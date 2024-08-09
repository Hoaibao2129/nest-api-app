import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { get } from 'http';
@Controller('user')
export class UserController {
    constructor(protected userService: UserService) { }

    @Post("")
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get("")
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get("/:userId")
    async getUserById(@Param('userId') userId) {
        const userIdNumber = parseInt(userId);
        if (!isNaN(userIdNumber)) {
            return this.userService.getUserById(userIdNumber)
        } else {
            throw new Error("Invalid userId")
        }

    }

}
