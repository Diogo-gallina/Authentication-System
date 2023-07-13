import { Module } from '@nestjs/common';

import { RegisterUseCase } from './use-cases/register-user/register-user';
import { UserController } from '@/shared/infra/http/controllers/users.controller';
import { UsersRepository } from './infra/repositories/users.repository';
import { IUsersRepository } from '@/users/interfaces';
import { DeleteUserUseCase, ListUsersUseCase } from './use-cases';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
