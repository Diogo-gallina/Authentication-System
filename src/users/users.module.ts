import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { UserController } from '@/shared/infra/http/controllers/users-controller/users-controller';
import { UsersRepository } from './infra/repositories/users.repository';
import { IUsersRepository } from '@/users/domain/interfaces';
import {
  RegisterUseCase,
  ListUsersUseCase,
  SoftDeleteUserUseCase,
  UpdatePasswordUseCase,
} from './domain/use-cases';
import { jwtConstants } from '@/shared/constants/jwt-constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    ListUsersUseCase,
    SoftDeleteUserUseCase,
    UpdatePasswordUseCase,
    JwtService,
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
