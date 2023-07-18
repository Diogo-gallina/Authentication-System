import { compare } from 'bcryptjs';
import { Injectable } from '@nestjs/common';

import { IValidateUserUseCase } from '../../interfaces/validate-user-use-case';
import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/erros';
import { IAuthRepository } from '../../interfaces/auth-repositoey';

@Injectable()
export class ValidateUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute({ email, password }: IValidateUserUseCase) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) throw new Error(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) throw new Error(INVALID_CREDENTIALS_ERROR);

    return user;
  }
}
