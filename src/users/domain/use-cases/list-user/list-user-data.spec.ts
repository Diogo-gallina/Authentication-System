import { HttpException } from '@nestjs/common';
import { IUsersRepository } from '../../interfaces';
import { InMemoryUsersRepository } from '../../test/in-memory/in-memory-users-repository';
import { ListUsersUseCase } from './list-user-data';
import { User } from '@prisma/client';

describe('List Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: ListUsersUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUsersUseCase(usersRepository);
  });

  it('should be able to return a user by id', async () => {
    const user = await usersRepository.create({
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: '123456',
    });

    const searchForId = await sut.execute(user.id);

    expect(searchForId).toBe(user);
  });

  it('should not be able to list the user throwing an Error', async () => {
    const deletedUser = {
      id: 'id-fake',
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: '123456',
      created_at: new Date(),
      deleted: true,
    };

    await usersRepository.create(deletedUser);

    try {
      await sut.execute('id-fake');
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
