// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../services/auth/auth_service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return false;
    }

    try {
      const decoded = await this.jwtAuthService.verifyToken(token);
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
