import { Controller, Post, Body } from '@nestjs/common';

import { RegisterUseCase } from '@/users/use-cases/index';
import { RegisterUserDto } from '@/users/dto';

@Controller('user')
export class UserController {
  constructor(private registerUser: RegisterUseCase) {}

  @Post('/register')
  create(
    @Body()
    data: RegisterUserDto,
  ) {
    return this.registerUser.execute(data);
  }
}
