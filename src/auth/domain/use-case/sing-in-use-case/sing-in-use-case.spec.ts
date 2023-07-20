import { ITokenRepository } from '@/token/domain/interfaces';
import { ValidateUserUseCase } from '../validate-user-use-case/validate-user-use-case';
import { InMemoryTokenRepository } from '@/token/domain/test/in-memory/in-memory-tokens-repository';
import { InMemoryUsersRepository } from '@/users/domain/test/in-memory/in-memory-users-repository';
import { IUsersRepository } from '@/users/domain/interfaces';
import { SingInUseCase } from './sing-in-use-case';
import { JwtService } from '@nestjs/jwt';

describe('SingInUserUseCase', () => {
  let usersRepository: IUsersRepository;
  let tokenRepository: ITokenRepository;
  let jwtService: JwtService;
  let sut: SingInUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    tokenRepository = new InMemoryTokenRepository();
    jwtService = new JwtService();
    sut = new SingInUseCase(tokenRepository, jwtService);
  });

  it('should ', async () => {
    const user = await usersRepository.create({
      id: 'id-01',
      email: 'user@email.com',
      name: 'user',
      password_hash: '@abc123ABC',
      created_at: new Date(),
      deleted: false,
    });

    const result = await sut.execute(user);

    await expect(result).resolves.toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      }),
    );
  });
});
