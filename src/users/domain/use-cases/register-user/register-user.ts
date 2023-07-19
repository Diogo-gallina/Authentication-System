import { hash } from 'bcryptjs';

import {
  IRegisterUseCaseResponse,
  IUsersRepository,
} from '@/users/domain/interfaces';
import { EMAIL_ALREADY_EXISTS } from '@/shared/constants/errors';
import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from '@/users/domain/dtos';

@Injectable()
export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserDto): Promise<IRegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new Error(EMAIL_ALREADY_EXISTS);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });

    return { user };
  }
}
