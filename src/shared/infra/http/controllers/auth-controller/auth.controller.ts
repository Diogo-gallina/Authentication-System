import { Body, Controller, Post } from '@nestjs/common';

import { ISingInDto } from '@/auth/dto/sing-in-dto';
import { SingInUseCase } from '@/auth/use-case/sing-in-use-case/sing-in-use-case';
import { ValidateUserUseCase } from '@/auth/use-case/validate-user-use-case/validate-user-use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private singIn: SingInUseCase,
    private validateUser: ValidateUserUseCase,
  ) {}

  @Post()
  async login(@Body() user: ISingInDto) {
    const validatedUser = await this.validateUser.execute(user);
    return this.singIn.execute(validatedUser);
  }
}
