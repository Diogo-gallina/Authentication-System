import { Module } from '@nestjs/common';

import { UserController } from '@/shared/infra/http/controllers/users-controller/users.controller';
import { UsersRepository } from './infra/repositories/users.repository';
import { IUsersRepository } from '@/users/domain/interfaces';
import {
  RegisterUseCase,
  ListUsersUseCase,
  DeleteUserUseCase,
  UpdatePasswordUseCase,
} from './domain/use-cases';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UpdatePasswordUseCase,
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UsersModule {}
