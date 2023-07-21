import { RefreshTokenDto } from '@/token/domain/dtos/refresh-token-dto';
import { RefreshTokenUseCase } from '@/token/domain/use-cases';
import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Token') // Add a tag for your controller
@Controller('session')
export class TokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Patch('refresh')
  @ApiOperation({ summary: 'Refresh Access Token' }) // Add a summary for the endpoint
  @ApiBody({ type: RefreshTokenDto }) // Add the request body schema for Swagger
  @ApiResponse({
    status: 200,
    description: 'New access token generated successfully',
  }) // Define the response for Swagger
  @ApiResponse({ status: 404, description: 'Invalid refresh token' }) // Define another response for Swagger
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(data);
  }
}
