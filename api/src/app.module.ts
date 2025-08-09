import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { getDatabaseConfig } from "./config/database.config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./auth/users.module";
import { DeckModule } from "./deck/deck.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

/**
 * The root module of the application.
 * It aggregates all other modules and configures global settings.
 */
@Module({
  imports: [
    // Configures the application to load environment variables from .env file.
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    // Configures TypeORM for database integration using an asynchronous factory.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: getDatabaseConfig,
    }),
    // Integrates Passport for authentication strategies.
    PassportModule,
    // Configures JWT for token-based authentication.
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "24h" },
      }),
    }),
    // Authentication module handling user login, registration, and session management.
    AuthModule,
    // Module for managing user-related operations.
    UsersModule,
    // Module containing deck and slide management logic, including AI generation.
    DeckModule,
  ],
  // Controllers responsible for handling incoming requests and returning responses.
  controllers: [AppController],
  // Providers (services) that can be injected into controllers or other providers.
  providers: [AppService],
})
export class AppModule {}


