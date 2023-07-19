import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import {
  SoftDeleteUserUseCase,
  ListUsersUseCase,
  RegisterUseCase,
  UpdatePasswordUseCase,
} from '@/users/domain/use-cases';
import { RegisterUserDto, UpdatePasswordDTO } from '@/users/domain/dtos';
import { AuthGuard } from '@/shared/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private registerUser: RegisterUseCase,
    private listUser: ListUsersUseCase,
    private deleteUser: SoftDeleteUserUseCase,
    private updatePassword: UpdatePasswordUseCase,
  ) {}

  @Post('create')
  create(
    @Body()
    data: RegisterUserDto,
  ) {
    return this.registerUser.execute(data);
  }

  @Get('list-one/:id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.listUser.execute(id);
  }

  @Patch('update-password/:id')
  updateUser(@Param('id') id: string, @Body() data: UpdatePasswordDTO) {
    return this.updatePassword.execute(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
