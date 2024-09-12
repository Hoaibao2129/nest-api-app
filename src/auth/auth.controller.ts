import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { isEmpty } from 'src/helper/checkEmptyData';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: loginDto) {
    if (isEmpty(user)) {
      throw new BadRequestException('Data can not be empty');
    }
    return this.authService.login(user);
  }
}
