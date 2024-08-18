import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtTokenModule } from 'src/jwt-token/jwt-token.module';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAccessAuthGuard } from 'src/@guards/jwt-access-auth.guard';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtTokenModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    CryptoService,
    {
      provide: APP_GUARD,
      useClass: JwtAccessAuthGuard,
    },
  ],
})
export class AuthModule {}
