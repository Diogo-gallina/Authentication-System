import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { ITokenRepository } from '@/token/interfaces';
import { GetResult } from '@prisma/client/runtime/library';

@Injectable()
export class TokenRpository implements ITokenRepository {
  async create(data: Prisma.TokenUncheckedCreateInput) {
    const { user_id, token } = data;

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
          token,
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
        token: token,
      },
    });

    return objToken;
  }

  async refrashToken(oldToken: string) {
    const x = oldToken;
  }
}
