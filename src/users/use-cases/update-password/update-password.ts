import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import {
  CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD,
  INCORRECT_CURRENT_PASSWORD,
} from '@/shared/constants/erros';
import { UsersRepository } from '@/users/infra/repositories';
import { IUpdatePassword } from '@/users/interfaces/update-password';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private usersReository: UsersRepository) {}

  async execute({
    id,
    currentPassword,
    newPassword,
    confirmNewPassword,
  }: IUpdatePassword): Promise<void> {
    const user = await this.usersReository.findById(id);

    const comparePassword = compare(currentPassword, user.password_hash);

    if (!comparePassword) throw new Error(INCORRECT_CURRENT_PASSWORD);

    if (newPassword !== confirmNewPassword)
      throw new Error(CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD);

    const passwordHash = await hash(newPassword, 6);

    await this.usersReository.updatePassword({
      id,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  }
}
