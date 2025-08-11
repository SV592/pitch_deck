import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeckService } from "./deck.service";
import { OpenAIService } from "../openai/openai.service";
import { UpdateSlideDto } from "./dto/update-slide.dto";
import { Slide } from "./slide.entity";

@Injectable()
export class SlideService {
  constructor(
    private readonly deckService: DeckService,
    private readonly openaiService: OpenAIService,
    @InjectRepository(Slide)
    private slideRepository: Repository<Slide>
  ) {}

  async regenerateSlide(
    deckId: string,
    slideId: string,
    prompt: string,
    deckDescription: string
  ) {
    const slide = await this.slideRepository.findOne({
      where: { id: slideId, deck: { id: deckId } },
    });

    if (!slide) {
      throw new Error("Slide not found");
    }

    const systemPrompt = `You are an expert in creating compelling pitch decks. Your task is to regenerate the content of a single slide based on the user's request.
      **Context:**
      - **Presentation Topic:** ${deckDescription}
      - **Slide Title:** ${slide.title}

      **Instructions:**
      1.  **Analyze the Request:** Carefully read the user's request to understand the desired changes.
      2.  **Generate Content:** Create new content for the slide that directly addresses the user's request. The content should be concise, impactful, and tailored to the presentation's topic.
      3.  **Constraints:** Do not include any text or explanations outside of the request and keep the content brief. Aim for a maximum of 5-7 lines of text or bullet points to avoid cluttering the slide.
      4.  **Format**: Return the responce in HTML format with appropriate use of bold, italic or bullets etc.
          **HTML Structure Guidelines:**
          - Use <h1> for the main headline of the slide.
          - Use <p> for paragraphs.
          - Use <ul> and <li> for bullet points.
          - Use <strong> for bold text.
          - Use <em> for italic text.

      User Prompt: "${prompt}"
      Current Slide Content: "${slide.content}"
    `;

    const generatedContent =
      await this.openaiService.generateSlideContent(systemPrompt);

    slide.content = generatedContent;
    await this.slideRepository.save(slide);

    return slide;
  }

  async getSlide(deckId: string, slideId: string) {
    const slide = await this.slideRepository.findOne({
      where: { id: slideId, deck: { id: deckId } },
    });

    if (!slide) {
      throw new Error("Slide not found");
    }

    return slide;
  }

  async updateSlide(
    deckId: string,
    slideId: string,
    updateSlideDto: UpdateSlideDto
  ) {
    const slide = await this.slideRepository.findOne({
      where: { id: slideId, deck: { id: deckId } },
    });

    if (!slide) {
      throw new Error("Slide not found");
    }

    if (updateSlideDto.title) {
      slide.title = updateSlideDto.title;
    }

    if (updateSlideDto.content) {
      slide.content = updateSlideDto.content;
    }

    if (updateSlideDto.speaker_notes) {
      slide.speaker_notes = updateSlideDto.speaker_notes;
    }

    await this.slideRepository.save(slide);

    return slide;
  }
}
