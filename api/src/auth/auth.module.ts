import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth0Strategy } from './auth0.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, Auth0Strategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule], // Export AuthService and PassportModule if needed by other modules
})
export class AuthModule {}
