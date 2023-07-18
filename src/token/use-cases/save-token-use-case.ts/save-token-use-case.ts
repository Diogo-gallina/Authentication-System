import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/interfaces';
import { ISaveToken } from '@/token/interfaces/save-token';

@Injectable()
export class SaveTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ token, userId }: ISaveToken): Promise<void> {
    await this.tokenRepository.create({
      token: token,
      user_id: userId,
    });
  }
}
