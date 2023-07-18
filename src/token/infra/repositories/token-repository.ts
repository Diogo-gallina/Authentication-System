import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { ITokenRepository } from '@/token/interfaces';

@Injectable()
export class TokenRpository implements ITokenRepository {
  async save(data: Prisma.TokenCreateInput) {
    const token = await prisma.token.create({
      data,
    });

    return token;
  }
}
