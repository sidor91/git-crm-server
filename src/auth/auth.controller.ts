import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, AuthUserDto } from './dto/auth-user.dto';
import { Public } from 'src/@decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from 'src/@decorators/getCurrentUserId.decorator';
import { CommonResponseDto } from 'src/common/dto/common.dto';

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

  @Get('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    type: CommonResponseDto,
  })
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId);
  }
}
