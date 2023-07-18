import { Injectable } from '@nestjs/common';

import { IUsersRepository } from '@/users/interfaces';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}