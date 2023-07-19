import { RefreshTokenDto } from '@/token/domain/dtos/refresh-token-dto';
import { RefreshTokenUseCase } from '@/token/domain/use-cases';
import { Body, Controller, Patch } from '@nestjs/common';

@Controller('session')
export class TokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Patch('refresh')
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(data);
  }
}
