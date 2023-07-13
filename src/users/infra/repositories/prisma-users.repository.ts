import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { IUsersRepository } from '@/users/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  listUser(id: string) {
    const user = this.findById(id);

    return user;
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
