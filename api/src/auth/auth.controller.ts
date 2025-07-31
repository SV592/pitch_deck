import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard('auth0'))
  async getProfile(@Req() req) {
    // When using Auth0, the user object is populated by the validate method in Auth0Strategy
    // and contains the payload from the JWT.
    const email = req.user.email; // Assuming email is in the JWT payload
    const user = await this.authService.findOrCreateUser(email);
    return { message: 'Profile retrieved successfully', user: { id: user.id, email: user.email } };
  }
}
