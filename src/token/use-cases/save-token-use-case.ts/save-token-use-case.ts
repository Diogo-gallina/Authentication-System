import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/interfaces';
import { ISaveToken } from '@/token/interfaces/save-token';
import { Token } from '@prisma/client';

@Injectable()
export class SaveTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ token, userId }: ISaveToken): Promise<Token> {
    const refreshToken = await this.tokenRepository.save({
      token: token,
      user_id: userId,
    });

    return refreshToken;
  }
}
