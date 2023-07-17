import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { ISingInUseCase } from '../interface/sing-in-use-case';
import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/erros';
import { IUsersRepository } from '@/users/interfaces';

export class SingInUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: ISingInUseCase) {
    const user = await this.usersRepository.findByEmail(email);

    console.log(user);

    if (!user) throw new Error(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) throw new Error(INVALID_CREDENTIALS_ERROR);

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
