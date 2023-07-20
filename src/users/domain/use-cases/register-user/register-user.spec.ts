import { compare } from 'bcryptjs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { RegisterUseCase } from './register-user';
import { IUsersRepository } from '../../interfaces';
import { InMemoryUsersRepository } from '../../test/in-memory/in-memory-users-repository';
import { EMAIL_ALREADY_EXISTS } from '@/shared/constants/errors';

describe('Register Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: RegisterUseCase;
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should be able to regiter', async () => {
    const { user } = await sut.execute({
      name: 'Diogo Dias',
      email: 'diogo@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Diogo Dias',
      email: 'diogo@test.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'diogo@test.com';

    await sut.execute({
      name: 'Diogo Dias',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'Diogo Dias',
        email,
        password: '123456',
      }),
    ).rejects.toThrow(
      new HttpException(EMAIL_ALREADY_EXISTS, HttpStatus.CONFLICT),
    );
  });
});
