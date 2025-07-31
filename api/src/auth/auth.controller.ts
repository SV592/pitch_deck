import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import type { Request } from 'express';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard('auth0'))
  async getProfile(@Req() req: Request) {
    const auth0Id = (req.user as any).sub; // Auth0 user ID
    const email = (req.user as User).email;
    const name = (req.user as User).name; // Assuming name is also available

    const user = await this.authService.findOrCreateUser(auth0Id, email, name);
    return { message: 'Profile retrieved successfully', user: { auth0Id: user.auth0Id, email: user.email, name: user.name } };
  }
}