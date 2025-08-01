import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeckService } from "./deck.service";
import { DeckController } from "./deck.controller";
import { Deck } from "./deck.entity";
import { Slide } from "./slide.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Slide])],
  controllers: [DeckController],
  providers: [DeckService],
  exports: [DeckService],
})
export class DeckModule {}
