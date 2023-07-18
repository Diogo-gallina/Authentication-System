import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { IAuthRepository } from '@/auth/interfaces/auth-repositoey';

@Injectable()
export class InMemoryAuthRepository implements IAuthRepository {
  private users: User[] = [];

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async createUser(user: User) {
    this.users.push(user);
    return user;
  }
}
