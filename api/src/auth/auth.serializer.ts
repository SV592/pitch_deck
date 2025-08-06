import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction): void {
    done(null, user.id); // Store only the user ID in the session
  }

  async deserializeUser(payload: string, done: CallableFunction): Promise<void> {
    const user = await this.usersService.findById(payload);
    done(null, user); // Retrieve the full user object from the database
  }
}