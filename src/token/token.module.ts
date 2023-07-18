import { Module } from '@nestjs/common';

import { SaveTokenUseCase } from './use-cases/save-token-use-case.ts/save-token-use-case';
import { ITokenRepository } from './interfaces';
import { TokenRpository } from './infra/repositories/token-repository';
import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';

@Module({
  controllers: [TokenController],
  providers: [
    SaveTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRpository,
    },
  ],
})
export class TokenModule {}
