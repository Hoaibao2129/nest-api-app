import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PrismaService } from '../prisma.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requestToken = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(requestToken);
    const requiredRoles = this.reflector.get<string>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const userGet = await this.prisma.user.findMany({
      where: { token: token },
    });
    if (userGet.length === 0) {
      throw new ForbiddenException('User does not exist');
    }
    const roleGet = await this.prisma.role.findMany({
      where: { id: userGet[0].roleId },
    });
    console.log(roleGet);
    if (!roleGet) {
      throw new ForbiddenException('Roles does not exist');
    }
    if (roleGet[0].roleName !== requiredRoles) {
      throw new ForbiddenException(
        'You do not have permission to access this resource',
      );
    }
    return true;
  }

  private hasRole(user: any, roles: string[]): boolean {
    return roles.some((role) => user.roles?.includes(role));
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
