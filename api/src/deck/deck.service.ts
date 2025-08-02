import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { Slide } from "./slide.entity";
import { OpenAIService } from "../openai/openai.service";

@Injectable()
export class DeckService {
  constructor(
    @InjectRepository(Deck)
    private deckRepository: Repository<Deck>,
    @InjectRepository(Slide)
    private slideRepository: Repository<Slide>,
    private openAIService: OpenAIService,
  ) {}

  async createDeck(
    title: string,
    userId: string,
    slidesData: any[] = []
  ): Promise<Deck> {
    const deck = this.deckRepository.create({
      title,
      userId,
    });
    const savedDeck = await this.deckRepository.save(deck);

    if (slidesData.length > 0) {
      for (const slideData of slidesData) {
        const slide = this.slideRepository.create({
          ...slideData,
          deckId: savedDeck.id,
        });
        await this.slideRepository.save(slide);
      }
    }

    return this.deckRepository.findOne({
      where: { id: savedDeck.id },
      relations: ["slides"],
    });
  }

  async generateDeck(companyInfo: any, userId: string): Promise<Deck> {
    const generatedOutline = await this.openAIService.generatePitchDeckOutline(companyInfo);

    const deckTitle = companyInfo.companyName ? `${companyInfo.companyName} Pitch Deck` : "Generated Pitch Deck";

    const newDeck = await this.createDeck(deckTitle, userId);

    if (generatedOutline && generatedOutline.slides && generatedOutline.slides.length > 0) {
      for (const slideData of generatedOutline.slides) {
        const slide = this.slideRepository.create({
          title: slideData.title || "",
          content: slideData.content || "",
          deckId: newDeck.id,
        });
        await this.slideRepository.save(slide);
      }
    }

    return this.getDeck(newDeck.id);
  }

  async getDeck(id: string): Promise<Deck> {
    return this.deckRepository.findOne({
      where: { id },
      relations: ["slides"],
    });
  }

  async getDecksByUser(userId: string): Promise<Deck[]> {
    return this.deckRepository.find({
      where: { userId },
      relations: ["slides"],
    });
  }

  async updateDeck(id: string, userId: string, updateData: any): Promise<Deck> {
    const deck = await this.deckRepository.findOne({
      where: { id, userId },
      relations: ["slides"],
    });

    if (!deck) {
      throw new Error("Deck not found");
    }

    if (updateData.title) {
      deck.title = updateData.title;
    }

    if (updateData.slides) {
      const updatedSlideIds = updateData.slides
        .filter((slide) => slide.id)
        .map((slide) => slide.id);

      const slidesToRemove = deck.slides.filter(
        (slide) => !updatedSlideIds.includes(slide.id)
      );

      for (const slide of slidesToRemove) {
        await this.slideRepository.delete(slide.id);
      }

      for (const slideDto of updateData.slides) {
        if (slideDto.id) {
          const existingSlide = deck.slides.find((s) => s.id === slideDto.id);
          if (existingSlide) {
            await this.slideRepository.update(slideDto.id, slideDto);
          }
        } else {
          const newSlide = this.slideRepository.create({
            ...slideDto,
            deckId: deck.id,
          });
          await this.slideRepository.save(newSlide);
        }
      }
    }

    await this.deckRepository.save(deck);
    return this.getDeck(id);
  }
}