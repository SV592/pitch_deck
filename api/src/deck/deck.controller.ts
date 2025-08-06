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
import { UsersService } from "../auth/users.service";

@Controller("decks")
@UseGuards(JwtAuthGuard)
export class DeckController {
  constructor(
    private readonly deckService: DeckService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createDeckDto: any, @Request() req) {
    console.log("Creating deck with user:", req.user);
    const user = await this.usersService.findOrCreateByAuth0Id(req.user.sub, {
      email: req.user.email || `user-${req.user.sub}@auth0.com`, // Fallback email if not available
    });
    return this.deckService.createDeck(
      createDeckDto.title,
      user.id, // Use the UUID from the User entity
      createDeckDto.slides || []
    );
  }

  @Post("generate")
  async generate(@Body() companyInfo: any, @Request() req) {
    console.log("DeckController: Received generate request.");
    console.log("DeckController: Company Info:", companyInfo);
    console.log("Generating deck with user:", req.user);
    const user = await this.usersService.findOrCreateByAuth0Id(req.user.sub, {
      email: req.user.email || `user-${req.user.sub}@auth0.com`, // Fallback email if not available
    });
    const generatedDeck = await this.deckService.generateDeck(companyInfo, user.id); // Use the UUID from the User entity
    console.log("DeckController: Deck generation complete.");
    return generatedDeck;
  }

  @Get()
  async findAll(@Request() req) {
    const user = await this.usersService.findOrCreateByAuth0Id(req.user.sub, {
      email: req.user.email || `user-${req.user.sub}@auth0.com`, // Fallback email if not available
    });
    return this.deckService.getDecksByUser(user.id); // Use the UUID from the User entity
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.deckService.getDeck(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateDeckDto: any, @Request() req) {
    const user = await this.usersService.findOrCreateByAuth0Id(req.user.sub, {
      email: req.user.email || `user-${req.user.sub}@auth0.com`, // Fallback email if not available
    });
    return this.deckService.updateDeck(id, user.id, updateDeckDto); // Use the UUID from the User entity
  }

  @Delete(":id")
  async remove(@Param("id") id: string, @Request() req) {
    const user = await this.usersService.findOrCreateByAuth0Id(req.user.sub, {
      email: req.user.email || `user-${req.user.sub}@auth0.com`, // Fallback email if not available
    });
    await this.deckService.deleteDeck(id, user.id);
    return { message: "Deck deleted successfully" };
  }
}