import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from '@/shared/infra/http/controllers';
import { jwtConstants } from '@/shared/constants/constants';
import { SingInUseCase } from './use-case/sing-in-use-case';
import { IAuthRepository } from './interfaces/auth-repositoey';
import { AuthRepository } from './infra/in-memory';
import { SaveTokenUseCase } from '@/token/use-cases/save-token-use-case.ts/save-token-use-case';
import { ITokenRepository } from '@/token/interfaces';
import { TokenRpository } from '@/token/infra/repositories/token-repository';

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
    SingInUseCase,
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    SaveTokenUseCase,
    {
      provide: ITokenRepository,
      useClass: TokenRpository,
    },
  ],
  exports: [SingInUseCase, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
