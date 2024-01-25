// auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CoreService } from './core_service';

@Injectable()
export class AuthService {
  private readonly secretKey = 'deivide';

  constructor(
    private readonly jwtService: JwtService,
    private readonly coreService: CoreService,
  ) {}

  async signPayload(payload: any): Promise<string> {
    const extendedPayload = { ...payload, role: 'user' };
    return this.jwtService.sign(extendedPayload, {
      expiresIn: '1h',
      secret: this.secretKey,
    });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: this.secretKey });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async loginUser(email: string, password: string): Promise<string | null> {
    const query = 'SELECT * FROM USER_TABLE WHERE EMAIL = ? AND SENHA = ?';
    const params = [email, password];

    const result = await this.coreService.executeQuery(query, params);

    if (result.length === 0) {
      return null; // Credenciais inválidas
    }

    const token = await this.signPayload({
      email: result[0].EMAIL,
      id: result[0].ID,
    });

    return token;
  }
}
