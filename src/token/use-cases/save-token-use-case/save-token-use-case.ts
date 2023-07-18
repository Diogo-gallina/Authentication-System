import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/interfaces';
import { ISaveToken } from '@/token/interfaces/save-token';

@Injectable()
export class SaveTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ token, userId, refreshToken }: ISaveToken): Promise<void> {
    await this.tokenRepository.create({
      accessToken: token,
      user_id: userId,
      refreshToken: refreshToken,
    });
  }
}
