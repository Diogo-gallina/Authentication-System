import { Body, Controller, HttpStatus, Patch } from '@nestjs/common';
import {
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { RefreshTokenDto } from '@/token/domain/dtos/refresh-token-dto';
import { RefreshTokenUseCase } from '@/token/domain/use-cases';

@ApiTags('Token')
@Controller('session')
export class TokenController {
  constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

  @Patch('refresh')
  @ApiOperation({ summary: 'Refresh Access Token' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example:
            'eyJhbGciOyTIUzI1SiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjg5OTUzMTU3LCJleHAiOjE2ODk5NTMyMTd9.9p4VnxmuaMc7Re9Q9jq957oMbzg20HVGZvdBxFKy-44',
        },
      },
      required: ['refreshToken'],
    },
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Login successfully',
    schema: {
      type: 'object',
      properties: {
        accessToken: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZTY4OTFhMC1kMTk5LTQ4MGQtOGMyMC0zZjQyM2UwOGQ4MTAiLCJlbWFpbCI6ImtheWtlLmZ1amluYWthQGdjYmludmVzdGltZW50b3MuY29tIiwiYnUiOiJBQ0FERU1ZIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNjgwMDQ4MjgzLCJleHAiOjE2ODAwNDgzNDN9.p7V-UKQ27JlSjjDfHgXJRYxw73WcCiFckALdT_S7UFg',
        },
      },
      required: ['accessToken'],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid refresh token',
  })
  async refreshToken(@Body() data: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(data);
  }
}
