import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

interface RequestWithToken extends Request {
  access_token?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(
    request: RequestWithToken,
    payload: { email: string; id: string },
  ) {
    const { access_token } = request;
    return await this.authService.validateUser({
      id: payload.id,
      email: payload.email,
      access_token,
    });
  }
}
