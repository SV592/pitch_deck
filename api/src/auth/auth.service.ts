import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOrCreateUser(auth0Id: string, email: string, name?: string): Promise<User> {
    let user = await this.usersRepository.findOne({ where: { auth0Id } });
    if (!user) {
      user = this.usersRepository.create({ auth0Id, email, name });
      await this.usersRepository.save(user);
    } else {
      // Update user's email and name if they have changed
      user.email = email;
      user.name = name;
      await this.usersRepository.save(user);
    }
    return user;
  }

  async findByAuth0Id(auth0Id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { auth0Id } });
  }

  async updateUserProfile(auth0Id: string, profileData: Partial<User>): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { auth0Id } });
    if (!user) {
      return null;
    }
    Object.assign(user, profileData);
    return this.usersRepository.save(user);
  }
}