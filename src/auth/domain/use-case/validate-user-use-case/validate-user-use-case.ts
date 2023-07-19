import { compare } from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/errors';
import { IUsersRepository } from '@/users/domain/interfaces';
import { ValidateUserUseCaseDto } from '@/auth/domain/dtos';

@Injectable()
export class ValidateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: ValidateUserUseCaseDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches)
      throw new UnauthorizedException(INVALID_CREDENTIALS_ERROR);

    return user;
  }
}
