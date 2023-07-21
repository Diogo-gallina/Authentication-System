import { RefreshTokenDto } from '@/token/domain/dtos/refresh-token-dto';
import { RefreshTokenUseCase } from '@/token/domain/use-cases';
import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Token')
@Controller('session')
export class TokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Patch('refresh')
  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'New access token generated successfully',
  })
  @ApiResponse({ status: 404, description: 'Invalid refresh token' })
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(data);
  }
}
