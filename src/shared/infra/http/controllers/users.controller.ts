import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

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

  //   @Get()
  //   findAll() {
  //     return this.authService.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.authService.findOne(+id);
  //   }

  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //     return this.authService.update(+id, updateAuthDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.authService.remove(+id);
  //   }
}
