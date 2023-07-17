import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/interfaces';
import { Prisma } from '@prisma/client';
import { ISaveToken } from '@/token/interfaces/save-token';

@Injectable()
export class SaveTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute(
    token,
    userId,
    }: ISaveToken): ISa {
    await this.tokenRepository.save();
  }
}