import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AuthModule } from '@/auth/auth.module';
import { SingInUseCase } from '@/auth/domain/use-case/sing-in-use-case/sing-in-use-case';
import { SingInDto } from '@/auth/domain/dtos';
import { ValidateUserUseCase } from '@/auth/domain/use-case';

describe('AuthController (E2E)', () => {
  let app: INestApplication;
  let singInUseCase: SingInUseCase;
  let validateUserUseCase: ValidateUserUseCase;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    singInUseCase = moduleFixture.get<SingInUseCase>(SingInUseCase);
    validateUserUseCase =
      moduleFixture.get<ValidateUserUseCase>(ValidateUserUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth (POST)', () => {
    it('should return access and refresh tokens upon successful login', async () => {
      const userToLogin: SingInDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const validatedUser = {
        id: 'user-id',
        name: 'Test User',
        email: userToLogin.email,
        password_hash: 'hashed-password',
        created_at: new Date(),
        deleted: false,
      };

      jest
        .spyOn(validateUserUseCase, 'execute')
        .mockResolvedValueOnce(validatedUser);

      jest.spyOn(singInUseCase, 'execute').mockResolvedValueOnce({
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
      });

      const response = await request(app.getHttpServer())
        .post('/auth')
        .send(userToLogin)
        .expect(HttpStatus.CREATED);

      expect(response.body).toHaveProperty('accessToken', 'fake-access-token');
      expect(response.body).toHaveProperty(
        'refreshToken',
        'fake-refresh-token',
      );
    });

    it('should return 401 Unauthorized for invalid login credentials', async () => {
      const invalidUser: SingInDto = {
        email: 'invalid@example.com',
        password: 'wrong-password',
      };

      jest
        .spyOn(validateUserUseCase, 'execute')
        .mockRejectedValueOnce(
          new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED),
        );

      await request(app.getHttpServer())
        .post('/auth')
        .send(invalidUser)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
