import { Injectable } from '@nestjs/common';

import { prisma } from '@/shared/infra/database/prisma';
import { ITokenRepository } from '@/token/interfaces';
import { ISaveToken } from '@/token/interfaces/save-token';


@Injectable()
export class TokenRpository implements ITokenRepository {
  async save(data: ISaveToken) {
    const token = await prisma.token.create({
      data,
    });

    return token;
  }
}
