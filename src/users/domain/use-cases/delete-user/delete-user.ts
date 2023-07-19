import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '@/users/domain/interfaces';

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
