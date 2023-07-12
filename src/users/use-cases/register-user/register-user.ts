import { hash } from 'bcryptjs';

import { IRegisterUser, IUsersRepository } from '@/users/interfaces';
import { IRegisterUseCaseResponse } from '@/users/interfaces/register-use-case-response';
// import { EMAIL_ALREADY_EXISTS } from '@/shared/constants/erros';
import { EMAIL_ALREADY_EXISTS } from '../../../shared/constants/erros';

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: IRegisterUser): Promise<IRegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error(EMAIL_ALREADY_EXISTS);
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return { user };
  }
}
