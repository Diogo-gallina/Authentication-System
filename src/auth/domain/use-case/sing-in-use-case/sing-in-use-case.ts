import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/domain/interfaces';
import { User } from '@prisma/client';
import { ERROR_WHEN_GENERATING_TOKEN } from '@/shared/constants/errors';
import { SingInUseCaseDto } from '../../dtos';

@Injectable()
export class SingInUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private jwtService: JwtService,
  ) {}

  async execute(user: User): Promise<SingInUseCaseDto> {
    try {
      const payload = { sub: user.id, email: user.email };
      const token = await this.jwtService.signAsync(payload);

      const refreshToken = await this.generateRefreshToken();

      await this.tokenRepository.create({
        user_id: user.id,
        accessToken: token,
        refreshToken: refreshToken,
      });

      return {
        accessToken: token,
        refreshToken,
      };
    } catch {
      throw new HttpException(
        ERROR_WHEN_GENERATING_TOKEN,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async generateRefreshToken(): Promise<string> {
    const refreshTokenPayload = { tokenType: 'refresh' };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: '60s',
    });

    return refreshToken;
  }
}
