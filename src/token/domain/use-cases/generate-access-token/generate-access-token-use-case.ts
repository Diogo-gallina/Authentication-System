import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/domain/interfaces';
import { USER_DOES_NOT_EXIST } from '@/shared/constants/errors';

@Injectable()
export class GenerateAccessTokenUseCase {
  constructor(
    private tokenRepository: ITokenRepository,
    private jwtService: JwtService,
  ) {}

  async execute(user: User) {
    try {
      const payload = { sub: user.id, email: user.email };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '60s',
      });

      this.tokenRepository.updateAccessToken(user.id, accessToken);

      return {
        accessToken,
      };
    } catch (error) {
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);
    }
  }
}
