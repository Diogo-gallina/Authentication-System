import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';

import {
  CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD,
  INCORRECT_CURRENT_PASSWORD,
  USER_DOES_NOT_EXIST,
} from '@/shared/constants/errors';
import { IUsersRepository } from '@/users/domain/interfaces';
import { UpdatePasswordDTO } from '@/users/domain/dtos';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(
    id: string,
    { currentPassword, newPassword, confirmNewPassword }: UpdatePasswordDTO,
  ): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (user.deleted)
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);

    if (!user)
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);

    const doesPasswordMatches = await compare(
      currentPassword,
      user.password_hash,
    );

    if (!doesPasswordMatches)
      throw new HttpException(
        INCORRECT_CURRENT_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );

    if (newPassword !== confirmNewPassword)
      throw new HttpException(
        CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );
    const newPasswordHash = await hash(newPassword, 6);

    await this.usersRepository.updatePassword({
      id,
      newPassword: newPasswordHash,
    });
  }
}
