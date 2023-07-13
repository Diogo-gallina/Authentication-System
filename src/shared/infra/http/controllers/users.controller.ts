import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';

import {
  DeleteUserUseCase,
  ListUsersUseCase,
  RegisterUseCase,
} from '@/users/use-cases/index';
import { RegisterUserDto } from '@/users/dto';

@Controller('user')
export class UserController {
  constructor(
    private registerUser: RegisterUseCase,
    private listUser: ListUsersUseCase,
    private deleteUser: DeleteUserUseCase,
  ) {}

  @Post()
  create(
    @Body()
    data: RegisterUserDto,
  ) {
    return this.registerUser.execute(data);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.listUser.execute(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
