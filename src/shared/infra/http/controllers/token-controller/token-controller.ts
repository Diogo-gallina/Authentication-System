import { RefreshTokenDto } from '@/token/dto/refresh-token-dto';
import { RefreshTokenUseCase } from '@/token/use-cases/refresh-token/refresh-token-use-case';
import { Body, Controller, Patch } from '@nestjs/common';

@Controller('session')
export class TokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Patch()
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(data);
  }
}
