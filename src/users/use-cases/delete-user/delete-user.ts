import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '@/users/interfaces';
import { IDeleteUser } from '@/users/interfaces/delete-user';

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id }: IDeleteUser): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
