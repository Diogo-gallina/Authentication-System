import { Prisma, Token } from '@prisma/client';

import { ITokenRepository } from '@/token/interfaces';

export class InMemoryTokenRepository implements ITokenRepository {
  public items: Token[] = [];

  async create(data: Token): Promise<Token> {
    const { user_id, accessToken, refreshToken } = data;

    const existingToken = this.items.find((t) => t.user_id === user_id);

    if (existingToken) {
      existingToken.accessToken = accessToken;
      return existingToken;
    }

    const newToken: Token = {
      id: Math.random().toString(),
      user_id,
      accessToken,
      refreshToken,
      created_at: new Date(),
    };

    this.items.push(newToken);

    return newToken;
  }

  async findToken(token: string) {
    const objToken = this.items.find((item) => item.accessToken === token);

    if (!objToken) {
      return null;
    }

    return objToken;
  }
}
