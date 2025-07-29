import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deck } from './deck.entity';
import { Slide } from './slide.entity';
import { OpenAIService } from '../openai/openai.service';

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
    @InjectRepository(Slide)
    private slideRepository: Repository<Slide>,
    private openaiService: OpenAIService,
  ) {}

  async generateAndSaveDeck(companyInfo: any): Promise<Deck> {
    const generatedContent = await this.openaiService.generatePitchDeckOutline(companyInfo);
    const title = generatedContent.title || 'New Pitch Deck';
    const slidesData = generatedContent.slides.map((slide: any, index: number) => ({
      title: slide.title,
      content: slide.content,
      order: index + 1,
    }));

    return this.createDeck(title, slidesData);
  }

  async createDeck(title: string, slidesData: { title: string; content: string; order: number }[]): Promise<Deck> {
    const deck = this.deckRepository.create({ title });
    const savedDeck = await this.deckRepository.save(deck);

    const slides = slidesData.map(slideData => this.slideRepository.create({ ...slideData, deck: savedDeck }));
    await this.slideRepository.save(slides);

    return savedDeck;
  }

  async getDeckById(id: number): Promise<Deck> {
    return this.deckRepository.findOne({ where: { id }, relations: ['slides'] });
  }
}