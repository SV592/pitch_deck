import { Controller, Post, Body, Get, Param, NotFoundException } from '@nestjs/common';
import { DeckService } from './deck.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { GenerateDeckDto } from './dto/generate-deck.dto';

@Controller('decks')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Post('generate')
  async generate(@Body() generateDeckDto: GenerateDeckDto) {
    return this.deckService.generateAndSaveDeck(generateDeckDto);
  }

  @Post()
  async create(@Body() createDeckDto: CreateDeckDto) {
    const { title, slides } = createDeckDto;
    return this.deckService.createDeck(title, slides);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const deck = await this.deckService.getDeckById(+id);
    if (!deck) {
      throw new NotFoundException(`Deck with ID ${id} not found`);
    }
    return deck;
  }
}