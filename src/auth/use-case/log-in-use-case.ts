import { compare } from 'bcryptjs';

import { UsersRepository } from '@/users/infra/repositories';
import { ILoginUseCase } from '../interface/log-in-use-case';
import { AUTHENTICATION_ERROR } from '@/shared/constants/erros';

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: ILoginUseCase): Promise<void> {
    const user = this.usersRepository.findByEmail(email);

    if (!user) throw new Error(AUTHENTICATION_ERROR);

    const isValidPassword = await compare(password, (await user).password_hash);

    if (!isValidPassword) throw new Error(AUTHENTICATION_ERROR);
  }
}
