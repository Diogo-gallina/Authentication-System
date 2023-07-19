import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/domain/interfaces';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private jwtService: JwtService,
  ) {}

  async execute(user: User) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '60s',
    });

    this.tokenRepository.updateAccessToken(user.id, accessToken);

    return {
      accessToken,
    };
  }
}
