import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '@/users/domain/interfaces';
import { ValidateUpdatePasswordDto } from '@/users/domain/dtos';

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
      deleted: data.deleted,
      token: data.token,
    };

    this.items.push(user);

    return user;
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async updatePassword(data: ValidateUpdatePasswordDto): Promise<void> {
    const user = await this.findById(data.id);

    if (user) {
      user.password_hash = data.newPassword;
    } else {
      throw new Error(`User with id ${data.id} not found.`);
    }
  }

  async softDeleteUser(id: string): Promise<void> {
    const user = await this.findById(id);

    if (user) {
      user.deleted = true;
    }
  }
}
