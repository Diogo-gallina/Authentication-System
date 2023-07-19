import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { prisma } from '@/shared/infra/database/prisma';
import { ITokenRepository } from '@/token/domain/interfaces';

@Injectable()
export class TokenRepository implements ITokenRepository {
  async create(data: Prisma.TokenUncheckedCreateInput) {
    const { user_id, accessToken, refreshToken } = data;
    const existingToken = await this.findExistingToken(user_id);

    if (existingToken) {
      return await this.updateToken(
        existingToken.id,
        accessToken,
        refreshToken,
      );
    }

    return await this.createToken(data);
  }

  async findExistingToken(user_id: string) {
    return await prisma.token.findFirst({
      where: {
        user_id,
      },
    });
  }

  async updateToken(id: string, accessToken: string, refreshToken: string) {
    return await prisma.token.update({
      where: {
        id,
      },
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  async createToken(data: Prisma.TokenUncheckedCreateInput) {
    return await prisma.token.create({
      data,
    });
  }

  async updateAccessToken(id: string, accessToken: string) {
    return await prisma.token.update({
      where: {
        user_id: id,
      },
      data: {
        accessToken,
      },
    });
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
