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
    const generatedOutline = await this.openAIService.generatePitchDeckOutline(companyInfo);

    const deckTitle = companyInfo.companyName ? `${companyInfo.companyName} Pitch Deck` : "Generated Pitch Deck";

    const newDeck = await this.createDeck(deckTitle, userId, [], generatedOutline.theme);

    if (generatedOutline && generatedOutline.slides && generatedOutline.slides.length > 0) {
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

  private extractSlideContentParts(htmlContent: string) {
    let headline = '';
    let hook = '';
    let keyPoints: string[] = [];

    if (htmlContent) {
      const headlineMatch = htmlContent.match(/<h1>(.*?)<\/h1>/);
      if (headlineMatch && headlineMatch[1]) {
        headline = headlineMatch[1];
      }

      const hookMatch = htmlContent.match(/<p><strong>(.*?)<\/strong><\/p>/);
      if (hookMatch && hookMatch[1]) {
        hook = hookMatch[1];
      }

      const keyPointsMatches = [...htmlContent.matchAll(/<li>(.*?)<\/li>/g)];
      keyPoints = keyPointsMatches.map(match => match[1]);
    }

    return { headline, hook, keyPoints };
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
      // Create a map of existing slides for easy lookup
      const existingSlidesMap = new Map(deck.slides.map(s => [s.id, s]));
      const updatedSlides: Slide[] = [];

      for (const slideDto of updateData.slides) {
        const { headline, hook, keyPoints } = this.extractSlideContentParts(slideDto.content);

        if (slideDto.id) {
          // Existing slide: update in-memory entity
          const existingSlide = existingSlidesMap.get(slideDto.id);
          if (existingSlide) {
            Object.assign(existingSlide, {
              ...slideDto,
              headline,
              hook,
              key_points: keyPoints,
            });
            updatedSlides.push(existingSlide);
            existingSlidesMap.delete(slideDto.id); // Mark as processed
          }
        } else {
          // New slide: create new entity
          const newSlide = new Slide();
          Object.assign(newSlide, {
            ...slideDto,
            headline,
            hook,
            key_points: keyPoints,
            deckId: deck.id,
          });
          updatedSlides.push(newSlide);
        }
      }

      // Slides to remove are those remaining in existingSlidesMap
      const slidesToRemove = Array.from(existingSlidesMap.values());
      await this.slideRepository.remove(slidesToRemove); // Use remove for cascade delete

      deck.slides = updatedSlides; // Assign the updated list of slides to the deck
    }

    await this.deckRepository.save(deck); // This should cascade all changes
    return this.getDeck(id);
  }

  async deleteDeck(id: string, userId: string): Promise<void> {
    const result = await this.deckRepository.delete({ id, userId });
    if (result.affected === 0) {
      throw new Error("Deck not found or user not authorized.");
    }
  }

  async regenerateSlideContent(
    deckId: string,
    slideId: string,
    prompt: string,
    currentContent: string,
  ): Promise<string> {
    const slide = await this.slideRepository.findOne({
      where: { id: slideId, deck: { id: deckId } },
    });

    if (!slide) {
      throw new Error("Slide not found in the specified deck.");
    }

    const generatedContent = await this.openAIService.generateSlideContent(
      prompt,
    );

    slide.content = generatedContent;
    await this.slideRepository.save(slide);

    return generatedContent;
  }
}