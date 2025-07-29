import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './deck.entity';
import { Slide } from './slide.entity';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Slide])],
  providers: [DeckService],
  controllers: [DeckController],
})
export class DeckModule {}