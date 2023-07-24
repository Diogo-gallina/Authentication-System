import { InMemoryTokenRepository } from '@/token/domain/test/in-memory/in-memory-tokens-repository';
import { SingInUseCase } from './sing-in-use-case';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/shared/constants/jwt-constants';
import { HttpException } from '@nestjs/common';

describe('SingInUseCase', () => {
  let jwtService: JwtService;
  let tokenRepository: InMemoryTokenRepository;
  let sut: SingInUseCase;
  let createTokenMock: jest.SpyInstance;
  let expectedSingAsyncResponse: string;

  beforeAll(() => {
    expectedSingAsyncResponse = 'anyToken';

    jwtService = new JwtService({
      secret: jwtConstants.secret,
    });
    tokenRepository = new InMemoryTokenRepository();
    sut = new SingInUseCase(tokenRepository, jwtService);
    createTokenMock = jest.spyOn(JwtService.prototype, 'signAsync');
  });

  beforeEach(() => {
    createTokenMock.mockResolvedValue(expectedSingAsyncResponse);
  });

  it.only('should create access and refresh tokens', async () => {
    const user = {
      id: 'id-01',
      email: 'user@email.com',
      name: 'user',
      password_hash: '@abc123ABC',
      created_at: new Date(),
      deleted: false,
    };

    const result = await sut.execute(user);

    expect(result).toEqual({
      accessToken: expectedSingAsyncResponse,
      refreshToken: expectedSingAsyncResponse,
    });
  });

  it('should throw an exception when creating an invalid token  ', async () => {
    const user = {
      id: 'id-01',
      email: 'user@email.com',
      name: 'user',
      password_hash: '@abc123ABC',
      created_at: new Date(),
      deleted: false,
    };

    jest.spyOn(jwtService, 'signAsync').mockRejectedValue(HttpException);

    await expect(sut.execute(user)).rejects.toBeInstanceOf(HttpException);
  });
});
