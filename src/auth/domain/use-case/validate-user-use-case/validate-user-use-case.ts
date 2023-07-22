import { compare } from 'bcryptjs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  INVALID_CREDENTIALS_ERROR,
  USER_DOES_NOT_EXIST,
} from '@/shared/constants/errors';
import { IUsersRepository } from '@/users/domain/interfaces';
import { SingInDto } from '../../dtos';

@Injectable()
export class ValidateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: SingInDto) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || user.deleted)
      throw new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND);

    if (!user)
      throw new HttpException(
        INVALID_CREDENTIALS_ERROR,
        HttpStatus.UNAUTHORIZED,
      );

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches)
      throw new HttpException(
        INVALID_CREDENTIALS_ERROR,
        HttpStatus.UNAUTHORIZED,
      );

    return user;
  }
}
