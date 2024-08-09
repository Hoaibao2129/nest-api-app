import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './entities/user.entity';

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
}
