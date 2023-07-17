import { hash } from 'bcryptjs';

import { IUsersRepository } from '@/users/interfaces/';
import { InMemoryUsersRepository } from '@/users/test/in-memory/in-memory-users-repository';
import { SingInUseCase } from './sing-in-use-case';

describe('Login Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: SingInUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SingInUseCase(usersRepository);
  });

  it('should be able to login a user', async () => {
    await usersRepository.create({
      name: 'Leandro Diass',
      email: 'teste@teste.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to login with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to login with wrong password', async () => {
    await usersRepository.create({
      name: 'Leandro Diass',
      email: 'teste@teste.com',
      password_hash: await hash('123456', 6),
    });

    await expect(
      sut.execute({
        email: 'teste@teste.com',
        password: '123abc',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
