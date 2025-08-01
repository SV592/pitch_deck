import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Added 'api' prefix directly
export class AppController {
  constructor(private readonly appService: AppService) {
    // console.log('DEBUG: AppController constructor called.'); // Removed console.log
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
