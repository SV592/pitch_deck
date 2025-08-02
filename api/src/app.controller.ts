import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('api') // Added 'api' prefix directly
export class AppController {
  constructor(private readonly appService: AppService) {
    // console.log('DEBUG: AppController constructor called.'); // Removed console.log
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-auth')
  @UseGuards(JwtAuthGuard)
  testAuth(@Request() req) {
    console.log("Test auth endpoint called with user:", req.user);
    return { 
      message: 'Authentication successful', 
      user: req.user,
      timestamp: new Date().toISOString()
    };
  }
}
