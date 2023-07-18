import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { ITokenRepository, IUpdateToken } from '@/token/interfaces';

@Injectable()
export class TokenRpository implements ITokenRepository {
  async save(data: Prisma.TokenUncheckedCreateInput) {
    const token = await prisma.token.create({
      data,
    });

    return token;
  }

  async findById(userId: string) {
    const token = await prisma.token.findUnique({ where: { user_id: userId } });

    return token;
  }

  async updateRefreshToken(data: Token) {
    await prisma.token.update({
      where: {
        user_id: data.user_id,
      },
      data: {
        token: data.token,
      },
    });
  }
}
