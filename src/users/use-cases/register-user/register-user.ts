import { hash } from 'bcryptjs';

import { IRegisterUser, IUserRepository } from '@/users/interfaces';
import { prisma } from '@/shared/infra/database/prisma';
import { EMAIL_ALREADY_EXISTS } from '@/shared/constants/erros';
import { PrismaUsersRepository } from '@/users/infra/repositories/prisma-users.repository';

export class RegisterUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute({ name, email, password }: IRegisterUser) {
    const passwordHash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error(EMAIL_ALREADY_EXISTS);
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    });
  }
}
