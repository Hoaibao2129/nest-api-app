import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: loginDto) {
    const checkUser = await this.prisma.user.findUnique({
      where: { tel: loginDto.tel },
    });
    if (
      checkUser &&
      (await bcrypt.compare(loginDto.password, checkUser.password))
    ) {
      const payload = {
        tel: checkUser.tel,
        name: checkUser.name,
        password: checkUser.password,
      };
      const token = await this.jwtService.sign(payload);

      await this.prisma.user.update({
        where: { tel: checkUser.tel },
        data: { token: token },
      });
      return {
        ...checkUser,
        token,
      };
    } else {
      throw new Error('Login failed');
    }
  }
}
