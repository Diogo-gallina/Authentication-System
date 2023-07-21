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

  beforeEach(() => {
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

      expect(newToken.accessToken).toEqual(expect.any(String));
    });
  });

  describe('Fail Test', () => {
    it('should return an exception when there is no user', async () => {
      try {
        const refreshToken = 'validRefreshToken';
        await tokenRepository.create({
          user_id: 'invalid-id',
          refreshToken: refreshToken,
          accessToken: 'oldAccessToken',
        });

        await refreshTokenUseCase.execute({
          refreshToken: refreshToken,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });

    it('should', async () => {
      try {
        const refreshToken = null;

        await refreshTokenUseCase.execute({
          refreshToken: refreshToken,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
      }
    });
  });
});
