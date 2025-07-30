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

  async register(email: string, passwordHash: string): Promise<User> {
    const user = this.usersRepository.create({ email, passwordHash });
    return this.usersRepository.save(user);
  }

  async validateUser(email: string, passwordHash: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && user.passwordHash === passwordHash) { // In a real app, use bcrypt for password comparison
      return user;
    }
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
