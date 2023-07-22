import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { RegisterUserDto, UpdatePasswordDTO } from '@/users/domain/dtos';
import { AuthGuard } from '@/shared/guards/auth.guard';
import {
  RegisterUseCase,
  ListUsersUseCase,
  SoftDeleteUserUseCase,
  UpdatePasswordUseCase,
} from '@/users/domain/use-cases';
import { UserController } from './users-controller';

const registerUseCaseMock = {
  execute: jest.fn(),
};

const listUsersUseCaseMock = {
  execute: jest.fn(),
};

const softDeleteUserUseCaseMock = {
  execute: jest.fn(),
};

const updatePasswordUseCaseMock = {
  execute: jest.fn(),
};

describe('UserController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: RegisterUseCase,
          useValue: registerUseCaseMock,
        },
        {
          provide: ListUsersUseCase,
          useValue: listUsersUseCaseMock,
        },
        {
          provide: SoftDeleteUserUseCase,
          useValue: softDeleteUserUseCaseMock,
        },
        {
          provide: UpdatePasswordUseCase,
          useValue: updatePasswordUseCaseMock,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: jest.fn().mockResolvedValue(true),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/user/create (POST)', () => {
    it.only('should create a new user', async () => {
      const newUser: RegisterUserDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const createdUser = {
        id: 'user-id',
        name: newUser.name,
        email: newUser.email,
        password_hash: 'hashed-password',
        created_at: new Date().toISOString(),
        deleted: false,
      };

      registerUseCaseMock.execute.mockResolvedValueOnce({ user: createdUser });

      const response = await request(app.getHttpServer())
        .post('/user/create')
        .send(newUser)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({ user: createdUser });
    });
  });

  describe('/user/update-password/:id (PATCH)', () => {
    it('should update user password', async () => {
      const userId = 'user-id';
      const updatePasswordDto: UpdatePasswordDTO = {
        currentPassword: 'old-password',
        newPassword: 'new-password',
        confirmNewPassword: 'new-password',
      };

      updatePasswordUseCaseMock.execute.mockResolvedValueOnce({});

      const response = await request(app.getHttpServer())
        .patch(`/user/update-password/${userId}`)
        .send(updatePasswordDto)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.status).toBe(HttpStatus.NO_CONTENT);
      expect(updatePasswordUseCaseMock.execute).toHaveBeenCalledWith(
        userId,
        updatePasswordDto,
      );
    });
  });

  describe('/user/:id (DELETE)', () => {
    it('should delete a user', async () => {
      const userId = 'user-id';

      softDeleteUserUseCaseMock.execute.mockResolvedValueOnce({});

      const mockUser = {
        id: userId,
        name: 'John Doe',
        email: 'johndoe@example.com',
        deleted: false,
      };

      listUsersUseCaseMock.execute.mockResolvedValueOnce(mockUser);

      const response = await request(app.getHttpServer())
        .delete(`/user/${userId}`)
        .expect(HttpStatus.NO_CONTENT);

      expect(response.status).toBe(HttpStatus.NO_CONTENT);
      expect(softDeleteUserUseCaseMock.execute).toHaveBeenCalledWith(userId);
    });
  });
});
