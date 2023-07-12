import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { IUsersRepository } from '@/users/interfaces';

export class PrismaUsersRepository extends IUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
