import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { JwtTokenService } from 'src/jwt-token/jwt-token.service';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
    private readonly cryptoService: CryptoService,
  ) {}

  async validateUser(payload: {
    id: string;
    email: string;
    access_token: string;
  }): Promise<User | undefined> {
    return await this.userService.findOne({ where: payload });
  }

  async register(dto: AuthUserDto) {
    const hashedPassword = await this.cryptoService.hashPassword(dto.password);
    const user = await this.userService.findOne({ where: { email: dto.email } });

    if (user) {
      throw new BadRequestException(`The user with email ${dto.email} is already exists`)
    }

    const newUser = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return await this.generateAccessToken({
      email: newUser.email,
      id: newUser.id,
    });
  }

  async login(dto: AuthUserDto) {
    const user = await this.userService.findOne({
      where: { email: dto.email },
    });

    const isValidPassword = await this.cryptoService.validatePassword(
      dto.password,
      user.password,
    );
    if (!user || !isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.generateAccessToken({
      email: user.email,
      id: user.id,
    });
  }

  async generateAccessToken(payload: { id: string; email: string }) {
    const access_token =
      await this.jwtTokenService.generateAccessToken(payload);

    await this.userService.update({ email: payload.email, access_token });

    return { access_token };
  }
}
