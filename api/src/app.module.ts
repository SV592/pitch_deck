import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeckModule } from './deck/deck.module';
import { OpenAIModule } from './openai/openai.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Deck } from './deck/deck.entity';
import { Slide } from './deck/slide.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [User, Deck, Slide],
      synchronize: true, // WARNING: synchronize should be set to false in production
      ssl: {
        rejectUnauthorized: false, // Required for Vercel Postgres
      },
    }),
    DeckModule,
    OpenAIModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}