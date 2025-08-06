import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Deck } from "./deck.entity";
import { Slide } from "./slide.entity";
import { OpenAIService } from "../openai/openai.service";

@Injectable()
export class DeckService {
  private readonly logger = new Logger(DeckService.name);
  
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
    slidesData: any[] = [],
    theme: any = null,
  ): Promise<Deck> {
    const deck = this.deckRepository.create({
      title,
      userId,
      theme,
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
    this.logger.log("DeckService: Generating deck outline with OpenAI...");
    const generatedOutline = await this.openAIService.generatePitchDeckOutline(companyInfo);
    this.logger.log("DeckService: OpenAI outline generated.");
    this.logger.log("OpenAI Generated Theme:", generatedOutline.theme);

    const deckTitle = companyInfo.companyName ? `${companyInfo.companyName} Pitch Deck` : "Generated Pitch Deck";

    const newDeck = await this.createDeck(deckTitle, userId, [], generatedOutline.theme);
    this.logger.log(`DeckService: Created new deck with ID: ${newDeck.id}`);

    if (generatedOutline && generatedOutline.slides && generatedOutline.slides.length > 0) {
      this.logger.log(`DeckService: Adding ${generatedOutline.slides.length} slides to deck.`);
      for (const slideData of generatedOutline.slides) {
        const slide = this.slideRepository.create({
          title: slideData.headline || "",
          hook: slideData.hook || "",
          key_points: slideData.key_points || [],
          speaker_notes: slideData.speaker_notes || "",
          content: slideData.speaker_notes || "", // Using speaker_notes as the main content
          deckId: newDeck.id,
        });
        await this.slideRepository.save(slide);
      }
      this.logger.log("DeckService: Slides added.");
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

  async deleteDeck(id: string, userId: string): Promise<void> {
    const result = await this.deckRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new Error("Deck not found or user not authorized.");
    }
  }
}