import { Module } from '@nestjs/common';

import { ITokenRepository } from './domain/interfaces';
import { TokenRepository } from './infra/repositories/token-repository';
import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';
import { IUsersRepository } from '@/users/domain/interfaces';
import { UsersRepository } from '@/users/infra/repositories';
import { SingInUseCase } from '@/auth/domain/use-case/sing-in-use-case/sing-in-use-case';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';
import { jwtConstants } from '@/shared/constants/jwt-constants';
import {
  GenerateAccessTokenUseCase,
  RefreshTokenUseCase,
  SaveTokenUseCase,
} from './domain/use-cases';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
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
