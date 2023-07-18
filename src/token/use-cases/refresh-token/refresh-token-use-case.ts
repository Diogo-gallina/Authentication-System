import { INVALID_REFRESH_TOKEN } from '@/shared/constants/erros';
import { ITokenRepository } from '@/token/interfaces';
import { IRefreshToken } from '@/token/interfaces/refresh-token';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({ oldToken }: IRefreshToken) {
    const token = await this.tokenRepository.findToken(oldToken);

    if (!token) throw new Error(INVALID_REFRESH_TOKEN);

    return oldToken;
  }
}
