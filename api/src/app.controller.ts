import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api') // Added 'api' prefix directly
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-auth')
  @UseGuards(JwtAuthGuard)
  testAuth(@Request() req) {
    return { 
      message: 'Authentication successful', 
      user: req.user,
      timestamp: new Date().toISOString()
    };
  }
}
