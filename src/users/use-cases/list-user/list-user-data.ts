import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { USER_DOES_NOT_EXIST } from '@/shared/constants/erros';
import { IListUser, IUsersRepository } from '@/users/interfaces';

@Injectable()
export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id }: IListUser): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error(USER_DOES_NOT_EXIST);
    }

    return user;
  }
}
