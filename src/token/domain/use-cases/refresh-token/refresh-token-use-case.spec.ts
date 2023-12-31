import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RefreshTokenUseCase } from './refresh-token-use-case';
import { InMemoryUsersRepository } from '@/users/domain/test/in-memory/in-memory-users-repository';
import { InMemoryTokenRepository } from '../../test/in-memory/in-memory-tokens-repository';
import { GenerateAccessTokenUseCase } from '../generate-access-token/generate-access-token-use-case';
import { jwtConstants } from '@/shared/constants/jwt-constants';

describe('RefreshTokenUseCase', () => {
  let jwtService: JwtService;
  let tokenRepository: InMemoryTokenRepository;
  let usersRepository: InMemoryUsersRepository;
  let generateAccessTokenUseCase: GenerateAccessTokenUseCase;
  let refreshTokenUseCase: RefreshTokenUseCase;

  let refreshTokenMock: jest.SpyInstance;
  let expectedRefreshAsyncResponse: string;

  beforeAll(() => {
    expectedRefreshAsyncResponse = 'anyToken';
    refreshTokenMock = jest.spyOn(JwtService.prototype, 'signAsync');
  });

  beforeEach(() => {
    refreshTokenMock.mockResolvedValue(expectedRefreshAsyncResponse);
    jwtService = new JwtService({
      secret: jwtConstants.secret,
    });
    tokenRepository = new InMemoryTokenRepository();
    usersRepository = new InMemoryUsersRepository();
    generateAccessTokenUseCase = new GenerateAccessTokenUseCase(
      tokenRepository,
      jwtService,
    );
    refreshTokenUseCase = new RefreshTokenUseCase(
      tokenRepository,
      usersRepository,
      generateAccessTokenUseCase,
    );
  });

  describe('Sucess Test', () => {
    it('should return a new access token', async () => {
      const user = await usersRepository.create({
        id: 'id-01',
        email: 'user@email.com',
        name: 'user',
        password_hash: 'fakePassword',
        created_at: new Date(),
        deleted: false,
      });

      const refreshToken = 'validRefreshToken';
      await tokenRepository.create({
        user_id: user.id,
        refreshToken: refreshToken,
        accessToken: 'oldAccessToken',
      });

      const newToken = await refreshTokenUseCase.execute({
        refreshToken: refreshToken,
      });

      expect(newToken.accessToken).toEqual(expectedRefreshAsyncResponse);
    });
  });

  describe('Fail Test', () => {
    it('should return an exception when there is no user', async () => {
      const refreshToken = 'validRefreshToken';
      await tokenRepository.create({
        user_id: 'invalid-id',
        refreshToken: refreshToken,
        accessToken: 'oldAccessToken',
      });

      await expect(
        refreshTokenUseCase.execute({ refreshToken }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should return an exception when refreshToken is null', async () => {
      const refreshToken = null;

      await expect(
        refreshTokenUseCase.execute({ refreshToken }),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });
});
