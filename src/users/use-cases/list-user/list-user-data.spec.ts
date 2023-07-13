import { ListUsersUseCase } from './list-user-data';
import { IUsersRepository } from '@/users/interfaces';
import { InMemoryUsersRepository } from '@/users/test/in-memory/in-memory-users-repository';

describe('List Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: ListUsersUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUsersUseCase(usersRepository);
  });

  it('should be able to find a user by id', async () => {
    const user = await usersRepository.create({
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: '123456',
    });

    const searchForId = await sut.execute(user.id);

    expect(searchForId).toBe(user);
  });
});
