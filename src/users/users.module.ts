import { Module } from '@nestjs/common';

import { RegisterUseCase } from './use-cases/register-user/register-user';
import { UserController } from '@/shared/infra/http/controllers/users.controller';
import { PrismaUsersRepository } from './infra/repositories/prisma-users.repository';
import { IUsersRepository } from '@/users/interfaces';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    {
      provide: IUsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
})
export class UsersModule {}
