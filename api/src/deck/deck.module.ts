import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeckService } from "./deck.service";
import { DeckController } from "./deck.controller";
import { Deck } from "./deck.entity";
import { Slide } from "./slide.entity";
import { OpenAIModule } from "../openai/openai.module"; // Import OpenAIModule
import { UsersModule } from "../auth/users.module";
import { SlideController } from "./slide.controller";
import { SlideService } from "./slide.service";

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Slide]), OpenAIModule, UsersModule],
  controllers: [SlideController, DeckController],
  providers: [DeckService, SlideService],
  exports: [DeckService],
})
export class DeckModule {}
