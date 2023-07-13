import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { prisma } from '@/shared/infra/database/prisma';
import { IUsersRepository, IValidateUpdatePassword } from '@/users/interfaces';

@Injectable()
export class UsersRepository implements IUsersRepository {
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

  async updatePassword(data: IValidateUpdatePassword): Promise<void> {
    await prisma.user.update({
      where: { id: data.id },
      data: {
        password_hash: data.newPassword,
      },
    });
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
