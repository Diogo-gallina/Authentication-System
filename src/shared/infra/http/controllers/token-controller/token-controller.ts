import { RefreshTokenDto } from '@/token/dto/refresh-token-dto';
import { Body, Controller, Put } from '@nestjs/common';

@Controller('token')
export class TokenController {
  constructor(

  ) {}

  @Put()
  async refreshToken(@Body() data: RefreshTokenDto) {
    return any;
  }
}
