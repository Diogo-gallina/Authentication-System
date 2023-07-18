import { Injectable } from '@nestjs/common';

import { INVALID_REFRESH_TOKEN } from '@/shared/constants/erros';
import { ITokenRepository } from '@/token/interfaces';
import { IRefreshToken } from '@/token/interfaces/refresh-token';
import { IUsersRepository } from '@/users/interfaces';
import { SingInUseCase } from '@/auth/use-case/sing-in-use-case/sing-in-use-case';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private usersRepository: IUsersRepository,
    private singInUseCase: SingInUseCase,
  ) {}

  async execute({ refreshToken }: IRefreshToken) {
    const token = await this.tokenRepository.findToken(refreshToken);

    if (!token) throw new Error(INVALID_REFRESH_TOKEN);

    const user = await this.usersRepository.findById(token.user_id);

    const newToken = this.singInUseCase.execute(user);

    return newToken;
  }
}
