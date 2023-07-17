import { Body, Controller, Post } from '@nestjs/common';

@Controller('token')
export class TokenController {
  constructor() {}

  @Post()
  async login(@Body() any) {
    return any;
  }
}
