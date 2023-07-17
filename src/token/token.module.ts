import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from '../shared/infra/http/controllers/token-controller/token.controller';

@Module({
  controllers: [TokenController],
  providers: [TokenService]
})
export class TokenModule {}
