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

    await this.tokenRepository.create({ token: token, user_id: user.id });

    return {
      accessToken: token,
    };
  }
}
