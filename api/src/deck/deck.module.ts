import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeckService } from "./deck.service";
import { DeckController } from "./deck.controller";
import { Deck } from "./deck.entity";
import { Slide } from "./slide.entity";
import { OpenAIModule } from "../openai/openai.module"; // Import OpenAIModule
import { UsersModule } from "../auth/users.module"; // Import UsersModule

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Slide]), OpenAIModule, UsersModule], // Add UsersModule to imports
  controllers: [DeckController],
  providers: [DeckService],
  exports: [DeckService],
})
export class DeckModule {}
