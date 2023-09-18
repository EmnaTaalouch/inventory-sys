import { Post, Controller, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() AuthLoginDto: AuthLoginDto) {
    return this.authService.login(AuthLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    const user = req.user;
    const userProfile = await this.authService.getProfile(user.userId);
    return userProfile;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async test() {
    return 'Success Login';
  }
}
