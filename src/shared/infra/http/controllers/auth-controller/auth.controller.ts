import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { SingInUseCase } from '@/auth/domain/use-case/sing-in-use-case/sing-in-use-case';
import { SingInDto } from '@/auth/domain/dtos';
import { ValidateUserUseCase } from '@/auth/domain/use-case';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(
    private singIn: SingInUseCase,
    private validateUser: ValidateUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Login an user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'gcb123' },
      },
      required: ['email', 'password'],
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
        refreshToken: {
          type: 'string',
          example:
            'ee4bbb7778beaf6934aeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjg5OTUyNzcyLCJleHAiOjE2ODk5NTI4MzJ9.Uwv7Yenn0l8N3p8li3uM1d_PEqXZIyCDYr8a9LkESFYe01ae6ca6db7a97b2cd56a16edd4089dfc110ce2b277b',
        },
      },
      required: ['accessToken', 'refreshToken'],
    },
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials error.',
  })
  async login(@Body() user: SingInDto) {
    const validatedUser = await this.validateUser.execute(user);
    return this.singIn.execute(validatedUser);
  }
}
