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
    private slideRepository: Repository<Slide>,
  ) {}

  async regenerateSlide(
    deckId: string,
    slideId: string,
    prompt: string,
    deckDescription: string
  ) {
    const slide = await this.slideRepository.findOne({ where: { id: slideId, deck: { id: deckId } } });

    if (!slide) {
      throw new Error("Slide not found");
    }

    const systemPrompt = `You are an expert in creating compelling pitch decks. Your task is to regenerate the content of a single slide based on the user's request.
      **Context:**
      - **Presentation Topic:** ${deckDescription}
      - **Slide Title:** ${slide.title}
      - **User's Request:** "${prompt}"

      **Instructions:**
      1.  **Analyze the Request:** Carefully read the user's request to understand the desired changes.
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
    // Inject the Slide repository to directly interact with slide entities
    @InjectRepository(Slide)
    private slideRepository: Repository<Slide>,
  ) {}

  /**
   * Regenerates the content of a specific slide using AI based on user prompt and deck context.
   * @param deckId The ID of the deck the slide belongs to.
   * @param slideId The ID of the slide to regenerate.
   * @param prompt The user's specific instructions for regenerating the slide content.
   * @param deckDescription A summarized description of the entire deck for AI context.
   * @returns The updated Slide entity.
   */
  async regenerateSlide(
    deckId: string,
    slideId: string,
    prompt: string,
    deckDescription: string
  ) {
    // Fetch the slide directly from the repository to ensure it's a TypeORM entity
    // that can be saved after modification.
    const slide = await this.slideRepository.findOne({ where: { id: slideId, deck: { id: deckId } } });

    if (!slide) {
      throw new Error("Slide not found");
    }

    // Construct the system prompt for the AI model.
    // This prompt provides context about the presentation, the specific slide,
    // and clear instructions on how to generate the new content in HTML format.
    const systemPrompt = `You are an expert in creating compelling pitch decks. Your task is to regenerate the content of a single slide based on the user's request.
      **Context:**
      - **Presentation Topic:** ${deckDescription}
      - **Slide Title:** ${slide.title}
      - **User's Request:** "${prompt}"

      **Instructions:**
      1.  **Analyze the Request:** Carefully read the user's request to understand the desired changes.
      2.  **Generate Content:** Create new content for the slide that directly addresses the user's request. The content should be concise, impactful, and tailored to the presentation's topic.
      3.  **Format as HTML:** The output must be a single block of HTML code that can be directly inserted into the slide.
          - Use appropriate HTML tags for structure (e.g., <h2>, <p>, <ul>, <li>).
          - Do not include any other text or explanations outside of the HTML block.
      **Example Output:**
      html
      <h2>New Slide Title</h2>
      <p>This is the newly generated content for the slide.</p>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
      </ul>
    
    `;
    // Call the OpenAI service to generate the new slide content.
    const generatedContent = await this.openaiService.generateSlideContent(systemPrompt, slide.content);

    // Update the slide's content with the AI-generated content.
    slide.content = generatedContent;
    // Save the updated slide entity back to the database.
    await this.slideRepository.save(slide);

    return slide;
  }

  async getSlide(deckId: string, slideId: string) {
    const slide = await this.slideRepository.findOne({ where: { id: slideId, deck: { id: deckId } } });

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
    const slide = await this.slideRepository.findOne({ where: { id: slideId, deck: { id: deckId } } });

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
    
    `;
    const generatedContent = await this.openaiService.generateSlideContent(systemPrompt, slide.content);

    slide.content = generatedContent;
    await this.slideRepository.save(slide);

    return slide;
  }

  async getSlide(deckId: string, slideId: string) {
    const slide = await this.slideRepository.findOne({ where: { id: slideId, deck: { id: deckId } } });

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
    const slide = await this.slideRepository.findOne({ where: { id: slideId, deck: { id: deckId } } });

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
