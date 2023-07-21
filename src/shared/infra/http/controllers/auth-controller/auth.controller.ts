import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SingInUseCase } from '@/auth/domain/use-case/sing-in-use-case/sing-in-use-case';
import { SingInDto } from '@/auth/domain/dtos';
import { ValidateUserUseCase } from '@/auth/domain/use-case';

@ApiTags('Controller')
@Controller('auth')
export class AuthController {
  constructor(
    private singIn: SingInUseCase,
    private validateUser: ValidateUserUseCase,
  ) {}

  @Post()
  async login(@Body() user: SingInDto) {
    const validatedUser = await this.validateUser.execute(user);
    return this.singIn.execute(validatedUser);
  }
}
