import { Module } from '@nestjs/common';

import { SaveTokenUseCase } from './use-cases/save-token-use-case.ts/save-token-use-case';
import { ITokenRepository } from './interfaces';
import { TokenRpository } from './infra/repositories/token-repository';
import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';
import { RefreshTokenUseCase } from './use-cases/refresh-token/refresh-token-use-case';

@Module({
  controllers: [TokenController],
  providers: [
    RefreshTokenUseCase,
    SaveTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRpository,
    },
  ],
})
export class TokenModule {}
