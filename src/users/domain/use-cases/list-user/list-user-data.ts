import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { USER_DOES_NOT_EXIST } from '@/shared/constants/errors';
import { IUsersRepository } from '@/users/domain/interfaces';

@Injectable()
export class ListUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (user.deleted)
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);

    if (!user)
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);

    return user;
  }
}
