import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ITokenRepository } from '@/token/domain/interfaces';
import { GenerateAccessTokenUseCase } from './generate-access-token-use-case';
import { InMemoryTokenRepository } from '../../test/in-memory/in-memory-tokens-repository';
import { jwtConstants } from '@/shared/constants/jwt-constants';

describe('GenerateAccessTokenUseCase', () => {
  let jwtService: JwtService;
  let tokenRepository: ITokenRepository;
  let sut: GenerateAccessTokenUseCase;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: jwtConstants.secret,
    });
    tokenRepository = new InMemoryTokenRepository();
    sut = new GenerateAccessTokenUseCase(tokenRepository, jwtService);
  });

  describe('Sucess Test', () => {
    it('should', async () => {
      const user = {
        id: 'invalid-id',
        email: 'user@email.com',
        name: 'user',
        password_hash: 'fakePassword',
        created_at: new Date(),
        deleted: false,
      };

      const generateToken = await sut.execute(user);

      expect(generateToken.accessToken).toEqual(expect.any(String));
    });
  });

  describe('Fail Test', () => {
    it('should', async () => {
      const user = {
        id: 'invalid-id',
        email: 'user@email.com',
        name: 'user',
        password_hash: 'fakePassword',
        created_at: new Date(),
        deleted: false,
      };
      try {
        await sut.execute(user);
      } catch (error) {
        expect(error).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
