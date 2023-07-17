import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from '../users/users.module';
import { AuthController } from '@/shared/infra/http/controllers';
import { jwtConstants } from '@/shared/constants/constants';
import { SingInUseCase } from './use-case/sing-in-use-case';
import { IUsersRepository } from '@/users/interfaces';
import { UsersRepository } from '@/users/infra/repositories';

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
      provide: IUsersRepository,
      useClass: UsersRepository,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
