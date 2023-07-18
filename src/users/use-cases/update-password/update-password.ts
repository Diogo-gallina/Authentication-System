import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import {
  CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD,
  INCORRECT_CURRENT_PASSWORD,
} from '@/shared/constants/errors';
import { IUpdatePassword } from '@/users/interfaces/update-password';
import { IUsersRepository } from '@/users/interfaces';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    id,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: IUpdatePassword): Promise<void> {
    const user = await this.usersRepository.findById(id);

    const comparePassword = compare(currentPassword, user.password_hash);

    if (!comparePassword) throw new Error(INCORRECT_CURRENT_PASSWORD);

    if (newPassword !== confirmNewPassword)
      throw new Error(CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD);

    await hash(newPassword, 6);

    await this.usersRepository.updatePassword({
      id,
      newPassword,
    });
  }
}
