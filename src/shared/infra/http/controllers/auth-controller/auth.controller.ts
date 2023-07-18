import { Body, Controller, Post } from '@nestjs/common';

import { ISingInDto } from '@/auth/dto/sing-in-dto';
import { SingInUseCase } from '@/auth/use-case/sing-in-use-case/sing-in-use-case';

@Controller('auth')
export class AuthController {
  constructor(private singIn: SingInUseCase) {}

  @Post()
  async login(@Body() user: ISingInDto) {
    return this.singIn.execute(user);
  }
}
