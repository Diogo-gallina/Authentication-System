import { Injectable } from '@nestjs/common';

import { INVALID_REFRESH_TOKEN } from '@/shared/constants/errors';
import { ITokenRepository } from '@/token/interfaces';
import { IUsersRepository } from '@/users/interfaces';
import { IRefreshToken } from '@/token/interfaces/refresh-token';
import { GenerateAccessTokenUseCase } from '../generate-access-token-use-case.ts/generate-access-token-use-case';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private usersRepository: IUsersRepository,
    private generateAccessTokenUseCase: GenerateAccessTokenUseCase,
  ) {}

  async execute({ refreshToken }: IRefreshToken) {
    const token = await this.tokenRepository.findToken(refreshToken);

    if (!token) throw new Error(INVALID_REFRESH_TOKEN);

    const user = await this.usersRepository.findById(token.user_id);

    const newToken = this.generateAccessTokenUseCase.execute(user);

    return newToken;
  }
}
