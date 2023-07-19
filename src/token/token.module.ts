import { Module } from '@nestjs/common';

import { SaveTokenUseCase } from './use-cases/save-token-use-case/save-token-use-case';
import { ITokenRepository } from './interfaces';
import { TokenRepository } from './infra/repositories/token-repository';
import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token-use-case';
import { IUsersRepository } from '@/users/interfaces';
import { UsersRepository } from '@/users/infra/repositories';
import { SingInUseCase } from '@/auth/use-case/sing-in-use-case/sing-in-use-case';
import { IAuthRepository } from '@/auth/interfaces/auth-repositoey';
import { AuthRepository } from '@/auth/infra/in-memory';
import { JwtModule } from '@nestjs/jwt';
import { GenerateAccessTokenUseCase } from './use-cases/generate-access-token-use-case.ts/generate-access-token-use-case';
import { UsersModule } from '@/users/users.module';
import { jwtConstants } from '@/shared/constants/jwt-constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [TokenController],
  providers: [
    GenerateAccessTokenUseCase,
    SingInUseCase,
    RefreshTokenUseCase,
    SaveTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRepository,
    },
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
  ],
  exports: [
    RefreshTokenUseCase,
    SaveTokenUseCase,
    GenerateAccessTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRepository,
    },
  ],
})
export class TokenModule {}
