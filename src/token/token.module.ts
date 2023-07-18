import { Module } from '@nestjs/common';

import { SaveTokenUseCase } from './use-cases/save-token-use-case/save-token-use-case';
import { ITokenRepository } from './interfaces';
import { TokenRpository } from './infra/repositories/token-repository';
import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token-use-case';
import { IUsersRepository } from '@/users/interfaces';
import { UsersRepository } from '@/users/infra/repositories';
import { SingInUseCase } from '@/auth/use-case/sing-in-use-case';

@Module({
  controllers: [TokenController],
  providers: [
    SingInUseCase,
    RefreshTokenUseCase,
    SaveTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRpository,
    },
    {
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  exports: [
    RefreshTokenUseCase,
    SaveTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRpository,
    },
  ],
})
export class TokenModule {}
