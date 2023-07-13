import { UsersRepository } from '@/users/infra/repositories';
import { IAuthenticateUseCase } from '../interface/authenticate-use-case';

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: IAuthenticateUseCase): Promise<void> {
    const c = email;
  }
}
