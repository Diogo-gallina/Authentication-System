import { Injectable } from '@nestjs/common';

import { ITokenRepository } from '@/token/domain/interfaces';
import { SaveTokenDto } from '@/token/domain/dtos';

@Injectable()
export class SaveTokenUseCase {
  constructor(private tokenRepository: ITokenRepository) {}

  async execute({
    accessToken,
    userId,
    refreshToken,
  }: SaveTokenDto): Promise<void> {
    await this.tokenRepository.create({
      accessToken: accessToken,
      user_id: userId,
      refreshToken: refreshToken,
    });
  }
}
