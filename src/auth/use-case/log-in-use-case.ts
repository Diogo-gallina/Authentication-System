import { compare } from 'bcryptjs';

import { UsersRepository } from '@/users/infra/repositories';
import { ILoginUseCase } from '../interface/log-in-use-case';
import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/erros';
import { ILoginUseCaseResponse } from '../interface/log-in-use-case-response';

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: ILoginUseCase): Promise<ILoginUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(
      password,
      (
        await user
      ).password_hash,
    );

    if (!doesPasswordMatches) throw new Error(INVALID_CREDENTIALS_ERROR);

    return {
      user,
    };
  }
}
