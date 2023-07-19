import { compare } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/errors';
import { IValidateUserUseCase } from '@/auth/interfaces/validate-user-use-case';
import { IUsersRepository } from '@/users/interfaces';

@Injectable()
export class ValidateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IValidateUserUseCase) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches)
      throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);

    return user;
  }
}
