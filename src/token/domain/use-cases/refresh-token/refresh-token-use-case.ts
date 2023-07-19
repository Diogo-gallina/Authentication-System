import { Injectable } from '@nestjs/common';

import { INVALID_REFRESH_TOKEN } from '@/shared/constants/errors';
import { ITokenRepository } from '@/token/domain/interfaces';
import { IUsersRepository } from '@/users/domain/interfaces';
import { GenerateAccessTokenUseCase } from '../generate-access-token/generate-access-token-use-case';
import { RefreshTokenDto } from '@/token/domain/dtos';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private usersRepository: IUsersRepository,
    private generateAccessTokenUseCase: GenerateAccessTokenUseCase,
  ) {}

  async execute({ refreshToken }: RefreshTokenDto) {
    const token = await this.tokenRepository.findToken(refreshToken);

    if (!token) throw new Error(INVALID_REFRESH_TOKEN);

    const user = await this.usersRepository.findById(token.user_id);

    const newToken = this.generateAccessTokenUseCase.execute(user);

    return newToken;
  }
}
