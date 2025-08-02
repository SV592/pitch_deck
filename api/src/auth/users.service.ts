import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

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
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { auth0Id } });
  }

  async findOrCreateByAuth0Id(auth0Id: string, userData?: Partial<User>): Promise<User> {
    let user = await this.findByAuth0Id(auth0Id);
    
    if (!user) {
      // Create a new user with Auth0 ID
      user = this.userRepository.create({
        auth0Id,
        provider: 'auth0',
        isActive: true,
        ...userData
      });
      user = await this.userRepository.save(user);
    }
    
    return user;
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.findById(id);
  }
}
