import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, AuthUserDto } from './dto/auth-user.dto';
import { Public } from 'src/@decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    type: AuthResponseDto,
  })
  register(@Body() dto: AuthUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    type: AuthResponseDto,
  })
  login(@Body() dto: AuthUserDto) {
    return this.authService.login(dto);
  }
}
