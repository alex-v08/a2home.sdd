import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Post('login-mock')
  async loginMock(@Body() body: { role: 'CLIENT' | 'PROVIDER'; id: string }) {
    const payload = { sub: body.id, role: body.role };
    const token = this.jwtService.sign(payload);
    
    return {
      access_token: token,
      user: { id: body.id, role: body.role },
    };
  }
}
