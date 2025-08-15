import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ["decks"] });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { auth0Id },
      relations: ["decks", "decks.slides"],
    });
  }

  async findOrCreateByAuth0Id(
    auth0Id: string,
    userData?: Partial<User>
  ): Promise<User> {
    let user = await this.findByAuth0Id(auth0Id);

    if (!user) {
      // Create a new user with Auth0 ID
      user = this.userRepository.create({
        auth0Id,
        provider: "auth0",
        isActive: true,
        ...userData,
      });
      user = await this.userRepository.save(user);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    
    // If the name is being updated, split it into firstName and lastName
    if (updateUserDto.name) {
      const nameParts = updateUserDto.name.split(" ");
      user.firstName = nameParts[0];
      user.lastName = nameParts.slice(1).join(" ");
    }

    // Update other fields from the DTO
    user.phone = updateUserDto.phone ?? user.phone;
    user.location = updateUserDto.location ?? user.location;
    user.bio = updateUserDto.bio ?? user.bio;

    return this.userRepository.save(user);
  }
}
