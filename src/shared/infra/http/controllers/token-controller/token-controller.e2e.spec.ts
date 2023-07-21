import { HttpStatus, HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { TokenController } from '@/shared/infra/http/controllers/token-controller/token-controller';
import { RefreshTokenUseCase } from '@/token/domain/use-cases';
import { TokenModule } from '@/token/token.module';
import { RefreshTokenDto } from '@/token/domain/dtos/refresh-token-dto';

describe('TokenController (E2E)', () => {
  let app: TestingModule;
  let tokenController: TokenController;
  let refreshTokenUseCase: RefreshTokenUseCase;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [TokenModule],
    }).compile();

    tokenController = app.get<TokenController>(TokenController);
    refreshTokenUseCase = app.get<RefreshTokenUseCase>(RefreshTokenUseCase);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/session/refresh (PATCH)', () => {
    it('should return a new access token upon successful refresh', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'valid-refresh-token',
      };

      jest
        .spyOn(refreshTokenUseCase, 'execute')
        .mockImplementation(async () => ({ accessToken: 'new-access-token' }));

      const result = await tokenController.refreshToken(refreshTokenDto);

      expect(result).toBeDefined();
      expect(result.accessToken).toBe('new-access-token');
    });

    it('should handle invalid refresh token', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken: 'invalid-refresh-token',
      };

      jest
        .spyOn(refreshTokenUseCase, 'execute')
        .mockRejectedValue(
          new HttpException('Invalid refresh token', HttpStatus.NOT_FOUND),
        );

      let result;
      try {
        result = await tokenController.refreshToken(refreshTokenDto);
      } catch (error) {
        expect(error.message).toBe('Invalid refresh token');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
      expect(result).toBeUndefined();
    });
  });
});
