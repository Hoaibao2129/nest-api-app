import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(createUserDto: CreateUserDto) {
        const isUserExist = await this.prisma.user.findUnique({
            where: { tel: createUserDto.tel }
        })
        if (isUserExist) {
            throw new Error("User already exists")
        }
        return this.prisma.user.create({
            data: {
                name: createUserDto.name,
                email: createUserDto.email,
                password: createUserDto.password,
                tel: createUserDto.tel,
                address: createUserDto.address
            }
        })
    }

    async getAllUsers() {
        return this.prisma.user.findMany()
    }

    async getUserById(userId: number) {
        return this.prisma.user.findUnique({ where: { id: userId } })
    }

    async updateUser(updateUserDto: UpdateUserDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: updateUserDto.id }
        });

        if (!existingUser) {
            throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
        }

        // Update the user with the new data
        return this.prisma.user.update({
            where: { id: updateUserDto.id },
            data: updateUserDto,
        });
    }
}

