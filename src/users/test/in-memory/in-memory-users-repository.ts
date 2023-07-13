import { Prisma, User } from '@prisma/client';

import { IUsersRepository } from '@/users/interfaces';
import { IUpdatePassword } from '@/users/interfaces/update-password';

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
    };

    this.items.push(user);

    return user;
  }

  async findById(id: string) {
    const user = await this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  updatePassword(data: IUpdatePassword): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteUser(id: string) {
    const user = await this.findById(id);

    if (user) {
      const index = this.items.indexOf(user);
      this.items.splice(index, 1);
    }
  }
}
