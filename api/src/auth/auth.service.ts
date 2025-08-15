import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }

  async getProfile(auth0Id: string) {
    const user = await this.usersService.findByAuth0Id(auth0Id);
    // Manually construct a plain object to avoid circular dependency issues
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      plan: user.plan,
      dataProcessed: user.dataProcessed,
      createdAt: user.createdAt,
      // Map over the decks to remove the circular reference back to the user
      decks: user.decks.map((deck) => ({
        id: deck.id,
        title: deck.title,
        description: deck.description,
        theme: deck.theme,
        createdAt: deck.createdAt,
        updatedAt: deck.updatedAt,
        slides: deck.slides, // Include the slides for each deck
      })),
    };
  }

  async updateProfile(auth0Id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.update(auth0Id, updateUserDto);
  }
}

