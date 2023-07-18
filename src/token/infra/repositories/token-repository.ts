import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { ITokenRepository } from '@/token/interfaces';

@Injectable()
export class TokenRpository implements ITokenRepository {
  async create(data: Prisma.TokenUncheckedCreateInput) {
    const { user_id, accessToken } = data;

    const existingToken = await prisma.token.findFirst({
      where: {
        user_id,
      },
    });

    if (existingToken) {
      await prisma.token.update({
        where: {
          id: existingToken.id,
        },
        data: {
          accessToken,
        },
      });
      return existingToken;
    }

    const newToken = await prisma.token.create({
      data,
    });

    return newToken;
  }

  async findToken(token: string) {
    const objToken = await prisma.token.findUnique({
      where: {
        refreshToken: token,
      },
    });

    return objToken;
  }
}
