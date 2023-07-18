import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from '@/shared/infra/http/controllers';
import { jwtConstants } from '@/shared/constants/constants';
import { SingInUseCase } from './use-case/sing-in-use-case/sing-in-use-case';
import { IAuthRepository } from './interfaces/auth-repositoey';
import { AuthRepository } from './infra/in-memory';
import { ITokenRepository } from '@/token/interfaces';
import { TokenRepository } from '@/token/infra/repositories/token-repository';
import { RefreshTokenUseCase } from '@/token/use-cases';
import { IUsersRepository } from '@/users/interfaces';
import { UsersRepository } from '@/users/infra/repositories';
import { ValidateUserUseCase } from './use-case/validate-user-use-case/validate-user-use-case';
import { GenerateAccessTokenUseCase } from '@/token/use-cases/generate-access-token-use-case.ts/generate-access-token-use-case';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    ValidateUserUseCase,
    RefreshTokenUseCase,
    SingInUseCase,
    GenerateAccessTokenUseCase,
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
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
