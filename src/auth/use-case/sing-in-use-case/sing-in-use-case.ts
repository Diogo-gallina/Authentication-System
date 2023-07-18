import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/interfaces';
import { User } from '@prisma/client';

@Injectable()
export class SingInUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private jwtService: JwtService,
  ) {}

  async execute(user: User) {
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    const refreshToken = await this.generateRefreshToken();

    console.log(refreshToken);

    await this.tokenRepository.create({
      user_id: user.id,
      accessToken: token,
      refreshToken: refreshToken,
    });

    console.log(refreshToken);

    return {
      accessToken: token,
      refreshToken,
    };
  }

  private async generateRefreshToken(): Promise<string> {
    const refreshTokenPayload = { tokenType: 'refresh' };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: '2h',
    });

    return refreshToken;
  }
}
