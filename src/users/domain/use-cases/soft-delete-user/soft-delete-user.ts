import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { IUsersRepository } from '@/users/domain/interfaces';
import { USER_DOES_NOT_EXIST } from '@/shared/constants/errors';

@Injectable()
export class SoftDeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<number> {
    const user = await this.usersRepository.findById(id);

    if (!user || user.deleted)
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);

    await this.usersRepository.softDeleteUser(id);

    return HttpStatus.NO_CONTENT;
  }
}
