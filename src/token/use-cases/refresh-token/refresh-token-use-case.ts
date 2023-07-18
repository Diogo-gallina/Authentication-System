import { ITokenRepository } from '@/token/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ token, userId }: ISaveToken): Promise<void> {
    token = await this.tokenRepository.findToken

    if (token) {
      return oldToken
    }
  }
}
