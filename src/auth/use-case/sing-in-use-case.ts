import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { UsersRepository } from '@/users/infra/repositories';
import { ISingInUseCase } from '../interface/sing-in-use-case';
import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/erros';
import { ISingInUseCaseResponse } from '../interface/sing-in-use-case-response';

export class SingInUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: ISingInUseCase) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(
      password,
      (
        await user
      ).password_hash,
    );

    if (!doesPasswordMatches) throw new Error(INVALID_CREDENTIALS_ERROR);

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
