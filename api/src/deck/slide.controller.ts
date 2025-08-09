
import { Controller, Post, Body, Param, Get, Put } from '@nestjs/common';
import { SlideService } from './slide.service';
import { UpdateSlideDto } from './dto/update-slide.dto';

// Controller for handling slide-specific operations within a deck.
// The base path is empty here because the full paths are defined on each method
// to ensure explicit routing, especially when combined with a global API prefix.
@Controller()
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  /**
   * Regenerates the content of a specific slide using AI.
   * This endpoint expects the deck ID in the URL, and slide ID, user prompt,
   * and deck description in the request body.
   * @param deckId The ID of the deck.
   * @param slideId The ID of the slide to regenerate.
   * @param prompt The user's regeneration prompt.
   * @param deckDescription A summary of the deck for AI context.
   * @returns The updated slide data.
   */
  @Post('decks/:deckId/slides/regenerate')
  async regenerateSlide(
    @Param('deckId') deckId: string,
    @Body('slideId') slideId: string,
    @Body('prompt') prompt: string,
    @Body('deckDescription') deckDescription: string,
  ) {
    return this.slideService.regenerateSlide(deckId, slideId, prompt, deckDescription);
  }

  /**
   * Retrieves a specific slide by its ID within a deck.
   * @param deckId The ID of the deck.
   * @param slideId The ID of the slide to retrieve.
   * @returns The slide data.
   */
  @Get('decks/:deckId/slides/:slideId')
  async getSlide(
    @Param('deckId') deckId: string,
    @Param('slideId') slideId: string,
  ) {
    return this.slideService.getSlide(deckId, slideId);
  }

  /**
   * Updates a specific slide by its ID within a deck.
   * @param deckId The ID of the deck.
   * @param slideId The ID of the slide to update.
   * @param updateSlideDto The DTO containing the updated slide data.
   * @returns The updated slide data.
   */
  @Put('decks/:deckId/slides/:slideId')
  async updateSlide(
    @Param('deckId') deckId: string,
    @Param('slideId') slideId: string,
    @Body() updateSlideDto: UpdateSlideDto,
  ) {
    return this.slideService.updateSlide(deckId, slideId, updateSlideDto);
  }
}
