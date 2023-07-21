import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from '@/shared/infra/http/controllers';
import { SingInUseCase } from './domain/use-case/sing-in-use-case/sing-in-use-case';
import { ITokenRepository } from '@/token/domain/interfaces';
import { TokenRepository } from '@/token/infra/repositories/token-repository';
import { IUsersRepository } from '@/users/domain/interfaces';
import { UsersRepository } from '@/users/infra/repositories';
import { ValidateUserUseCase } from './domain/use-case/validate-user-use-case/validate-user-use-case';
import { jwtConstants } from '@/shared/constants/jwt-constants';
import {
  GenerateAccessTokenUseCase,
  RefreshTokenUseCase,
} from '@/token/domain/use-cases';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  providers: [
    ValidateUserUseCase,
    RefreshTokenUseCase,
    SingInUseCase,
    GenerateAccessTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRepository,
    },
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [SingInUseCase],
  controllers: [AuthController],
})
export class AuthModule {}
