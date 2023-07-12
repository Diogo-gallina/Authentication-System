import { Module } from '@nestjs/common';
import { RegisterUseCase } from './use-cases/register-user/register-user';
import { IRegisterUser } from './interfaces';

@Module({
  providers: [
    RegisterUseCase,
    {
      provide: IRegisterUser,
      useClass: RegisterUseCase,
    },
  ],
})
export class UsersModule {}
