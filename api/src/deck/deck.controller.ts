import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { DeckService } from "./deck.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("decks")
@UseGuards(JwtAuthGuard)
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post()
  create(@Body() createDeckDto: any, @Request() req) {
    return this.deckService.createDeck(
      createDeckDto.title,
      req.user.id,
      createDeckDto.slides || []
    );
  }

  @Get()
  findAll(@Request() req) {
    return this.deckService.getDecksByUser(req.user.id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.deckService.getDeck(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDeckDto: any, @Request() req) {
    return this.deckService.updateDeck(id, req.user.id, updateDeckDto);
  }
}
