import { HttpStatus, HttpException } from '@nestjs/common';
import { RefreshTokenUseCase } from './refresh-token-use-case';
import { InMemoryUsersRepository } from '@/users/domain/test/in-memory/in-memory-users-repository';
import { InMemoryTokenRepository } from '../../test/in-memory/in-memory-tokens-repository';
import { GenerateAccessTokenUseCase } from '../generate-access-token/generate-access-token-use-case';

describe('RefreshTokenUseCase', () => {
  let tokenRepository: InMemoryTokenRepository;
  let usersRepository: InMemoryUsersRepository;
  let generateAccessTokenUseCase: GenerateAccessTokenUseCase;
  let refreshTokenUseCase: RefreshTokenUseCase;

  beforeEach(() => {
    tokenRepository = new InMemoryTokenRepository();
    usersRepository = new InMemoryUsersRepository();
    generateAccessTokenUseCase = new GenerateAccessTokenUseCase();
    refreshTokenUseCase = new RefreshTokenUseCase(
      tokenRepository,
      usersRepository,
      generateAccessTokenUseCase,
    );
  });

  it('should generate a new access token when a valid refresh token is provided', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'hashedPassword',
    });

    const refreshToken = 'validRefreshToken';
    await tokenRepository.create({
      user_id: user.id,
      refreshToken: refreshToken,
      accessToken: 'oldAccessToken',
    });

    const newToken = await refreshTokenUseCase.execute({ refreshToken });

    expect(newToken).toBeDefined();
    expect(newToken.accessToken).toBeTruthy();
    expect(newToken.user_id).toBe(user.id);
  });

  it('should throw an HttpException when an invalid refresh token is provided', async () => {
    const invalidRefreshToken = 'invalidRefreshToken';

    await expect(
      refreshTokenUseCase.execute({ refreshToken: invalidRefreshToken }),
    ).rejects.toThrow(HttpException);

    try {
      await refreshTokenUseCase.execute({ refreshToken: invalidRefreshToken });
    } catch (error) {
      expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
    }
  });
});
