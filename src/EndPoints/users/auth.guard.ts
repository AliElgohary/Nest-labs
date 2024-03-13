import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './auth.decorator';
import { Role } from './auth.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const jwtDDD = context.switchToHttp().getRequest().header('auth-token');
    const decodedData = await this.jwtService.verify(jwtDDD);
    console.log(decodedData);
    if (decodedData.isAdmin) {
      return true;
    } else {
      return false;
    }
  }
}
