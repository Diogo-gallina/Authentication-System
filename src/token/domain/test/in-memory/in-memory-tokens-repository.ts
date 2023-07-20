import { Injectable } from '@nestjs/common';
import { Prisma, Token } from '@prisma/client';
import { ITokenRepository } from '@/token/domain/interfaces';

@Injectable()
export class InMemoryTokenRepository implements ITokenRepository {
  private tokens: Map<string, Token> = new Map();

  async create(data: Prisma.TokenUncheckedCreateInput): Promise<Token> {
    const { user_id, accessToken, refreshToken } = data;
    const existingToken = await this.findExistingToken(user_id);

    if (existingToken) {
      return this.updateToken(existingToken.id, accessToken, refreshToken);
    }

    const newToken: Token = {
      id: (this.tokens.size + 1).toString(),
      user_id,
      accessToken,
      refreshToken,
      created_at: new Date(),
    };

    this.tokens.set(newToken.id, newToken);
    return newToken;
  }

  async findExistingToken(user_id: string): Promise<Token | null> {
    const tokensArray = Array.from(this.tokens.values());
    return tokensArray.find((token) => token.user_id === user_id) || null;
  }

  async updateToken(
    id: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<Token> {
    const existingToken = this.tokens.get(id);

    if (!existingToken) {
      throw new Error(`Token with id ${id} not found.`);
    }

    const updatedToken: Token = {
      ...existingToken,
      accessToken,
      refreshToken,
    };

    this.tokens.set(id, updatedToken);
    return updatedToken;
  }

  async createToken(data: Prisma.TokenUncheckedCreateInput): Promise<Token> {
    const newToken: Token = {
      id: (this.tokens.size + 1).toString(),
      ...data,
      created_at: new Date(),
    };

    this.tokens.set(newToken.id, newToken);
    return newToken;
  }

  async updateAccessToken(id: string, accessToken: string): Promise<Token> {
    const existingToken = this.tokens.get(id);

    if (!existingToken) {
      throw new Error(`Token with id ${id} not found.`);
    }

    const updatedToken: Token = {
      ...existingToken,
      accessToken,
    };

    this.tokens.set(id, updatedToken);
    return updatedToken;
  }

  async findRefreshToken(token: string): Promise<Token | null> {
    const tokensArray = Array.from(this.tokens.values());
    return tokensArray.find((t) => t.refreshToken === token) || null;
  }
}
