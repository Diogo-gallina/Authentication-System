import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Patch,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  SoftDeleteUserUseCase,
  ListUsersUseCase,
  RegisterUseCase,
  UpdatePasswordUseCase,
} from '@/users/domain/use-cases';
import { RegisterUserDto, UpdatePasswordDTO } from '@/users/domain/dtos';
import { AuthGuard } from '@/shared/guards/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private registerUser: RegisterUseCase,
    private listUser: ListUsersUseCase,
    private deleteUser: SoftDeleteUserUseCase,
    private updatePassword: UpdatePasswordUseCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create an new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'User Name' },
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'gcb123' },
      },
      required: ['name', 'email', 'password'],
    },
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'ee6891a0-d199-480d-8c20-3f423e08d810',
        },
        name: {
          type: 'string',
          example: 'Rodrigo Garcia',
        },
        email: {
          type: 'string',
          example: 'rodrigogarcia@example.com',
        },
        password: {
          type: 'string',
          example:
            '$2b$08$rK8Z2P5nfhA25Z401CkmD.3/Yurd/qoVdBiAWXdWlmQJIHLf7D4Da',
        },
        deleted: {
          type: 'boolean',
          example: false,
        },
        created_at: {
          type: 'timestamp',
          example: '2023-03-29T00:02:05.494Z',
        },
      },
    },
  })
  create(@Body() data: RegisterUserDto) {
    return this.registerUser.execute(data);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Find an user by ID' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  findOne(@Param('id') id: string) {
    return this.listUser.execute(id);
  }

  @Patch('update-password/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Update a user's password" })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        currentPassword: { type: 'string', example: '@Vmf11022004' },
        newPassword: { type: 'string', example: '@asdASD12312' },
        confirmNewPassword: { type: 'string', example: '@asdASD12312' },
      },
      required: ['currentPassword', 'newPassword', 'confirmNewPassword  '],
    },
  })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User password updated successfully',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  updateUser(@Param('id') id: string, @Body() data: UpdatePasswordDTO) {
    return this.updatePassword.execute(id, data);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Delete an user' })
  @ApiNoContentResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'User deleted successfully',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
