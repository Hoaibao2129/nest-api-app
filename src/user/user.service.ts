import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: { tel: createUserDto.tel },
    });
    if (isUserExist) {
      throw new Error('User already exists');
    }
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {});
    });

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const role = await this.prisma.role.findUnique({
      where: { id: createUserDto.roleId },
    });

    if (!role) {
      throw new Error('Role not found');
    }

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash,
        tel: createUserDto.tel,
        address: createUserDto.address,
        token: null,
        role: { connect: { id: role.id } },
        cart: {
          create: {},
        },
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: updateUserDto.id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${updateUserDto.id} not found`);
    }

    return this.prisma.user.update({
      where: { id: updateUserDto.id },
      data: updateUserDto,
    });
  }

  async deleteUser(userId: number) {
    const userIsExist = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userIsExist) {
      throw new NotFoundException('User not found');
    }
    await this.prisma.user.delete({ where: { id: userId } });
    return 'User deleted successfully';
  }
}
