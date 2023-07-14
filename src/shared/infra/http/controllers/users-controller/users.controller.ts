import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';

import {
  DeleteUserUseCase,
  ListUsersUseCase,
  RegisterUseCase,
  UpdatePasswordUseCase,
} from '@/users/use-cases';
import { RegisterUserDto, UpdatePasswordDTO } from '@/users/dto';

@Controller('user')
export class UserController {
  constructor(
    private registerUser: RegisterUseCase,
    private listUser: ListUsersUseCase,
    private deleteUser: DeleteUserUseCase,
    private updatePassword: UpdatePasswordUseCase,
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

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdatePasswordDTO) {
    return this.updatePassword.execute(data);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
