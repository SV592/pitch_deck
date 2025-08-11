
import { Controller, Post, Body, Param, Get, Put, UseGuards } from '@nestjs/common';
import { SlideService } from './slide.service';
import { UpdateSlideDto } from './dto/update-slide.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Controller for handling slide-specific operations within a deck.
// The base path is empty here because the full paths are defined on each method
// to ensure explicit routing, especially when combined with a global API prefix.
@Controller()
@UseGuards(JwtAuthGuard)
export class SlideController {
  constructor(private readonly slideService: SlideService) {}

  

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
