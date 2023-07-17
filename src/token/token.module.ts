import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TokenController],
  providers: [],
})
export class TokenModule {}
