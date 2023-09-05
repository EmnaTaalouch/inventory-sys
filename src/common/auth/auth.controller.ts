import { Post, Controller, Body, UseGuards, Get } from '@nestjs/common';
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
  @Get()
  async test() {
    return 'Success Login';
  }
}
