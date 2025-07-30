import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {
    // In a real app, you'd use DTOs for request bodies
    const user = await this.authService.register(body.email, body.passwordHash);
    return { message: 'User registered successfully', user: { id: user.id, email: user.email } };
  }

  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.passwordHash);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user: { id: user.id, email: user.email } };
  }
}
