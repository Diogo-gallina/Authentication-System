import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '@/shared/constants/jwt-constants';
import { HttpException } from '@nestjs/common';
import { ValidateUserUseCase } from './validate-user-use-case';
import { InMemoryUsersRepository } from '@/users/domain/test/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';

describe('ValidateUserUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: ValidateUserUseCase;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({
      secret: jwtConstants.secret,
    });
    usersRepository = new InMemoryUsersRepository();
    sut = new ValidateUserUseCase(usersRepository);
  });

  it('should validate the user and return it', async () => {
    const userPasswordHash = await hash('@abc123ABC', 6);

    const user = await usersRepository.create({
      id: 'id-01',
      email: 'user@email.com',
      name: 'user',
      password_hash: userPasswordHash,
      created_at: new Date(),
      deleted: false,
    });

    const userEmail = user.email;

    const result = await sut.execute({
      email: userEmail,
      password: '@abc123ABC',
    });

    expect(result).toBe(user);
  });

  it('Should throw an exception if the password is different from the user password', async () => {
    const userPasswordHash = await hash('@abc123ABC', 6);

    const user = await usersRepository.create({
      id: 'id-01',
      email: 'user@email.com',
      name: 'user',
      password_hash: userPasswordHash,
      created_at: new Date(),
      deleted: false,
    });

    const userEmail = user.email;

    await expect(
      sut.execute({
        email: userEmail,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('Should throw an exception if the user does not exist', async () => {
    await expect(
      sut.execute({
        email: 'teste@teste',
        password: '@abc123ABC',
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
