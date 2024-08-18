import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  verify(token: string) {
    const secret = this.configService.get('JWT_SECRET');
    return this.jwtService.verify(token, {
      secret,
    });
  }

  async generateAccessToken(payload: {
    id: string;
    email: string;
  }): Promise<string> {
    console.log(process.env.JWT_SECRET)
    // Just for the test task an access token is never expired
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }
}
