import { Module } from '@nestjs/common';

import { RegisterUseCase } from './use-cases/register-user/register-user';
import { IRegisterUser } from './interfaces';
import { UserController } from '@/shared/infra/http/controllers/users.controller';

@Module({
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    {
      provide: IRegisterUser,
      useClass: RegisterUseCase,
    },
  ],
})
export class UsersModule {}
