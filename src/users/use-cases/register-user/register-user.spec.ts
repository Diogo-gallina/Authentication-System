import { compare } from 'bcryptjs';

import { RegisterUseCase } from './register-user';
import { IUsersRepository } from '@/users/interfaces';
import { InMemoryUsersRepository } from '@/users/test/in-memory/in-memory-users-repository';

describe('Register Use Case', () => {
  let usersRepository: IUsersRepository;
  let registerUseCase: RegisterUseCase;
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  //   afterEach(() => {});

  it('should be able to regiter', async () => {
    const { user } = await registerUseCase.execute({
      name: 'Diogo Dias',
      email: 'diogo@test.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
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

    await registerUseCase.execute({
      name: 'Diogo Dias',
      email,
      password: '123456',
    });

    await expect(() =>
      registerUseCase.execute({
        name: 'Diogo Dias',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
