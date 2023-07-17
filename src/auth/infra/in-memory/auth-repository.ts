import { Injectable } from '@nestjs/common';

import { prisma } from '@/shared/infra/database/prisma';
import { IAuthRepository } from '@/auth/interface/auth-repositoey';

@Injectable()
export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
