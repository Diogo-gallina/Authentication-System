import { IUsersRepository } from '@/users/interfaces';
import { User } from '@prisma/client';

export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<User> {}
}
