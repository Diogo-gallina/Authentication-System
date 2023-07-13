import { ListUsersUseCase } from './list-user-data';
import { IUsersRepository } from '@/users/interfaces';
import { InMemoryUsersRepository } from '@/users/test/in-memory/in-memory-users-repository';

describe('List Use Case', () => {
  let usersRepository: IUsersRepository;
  let listUserUseCase: ListUsersUseCase;
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    listUserUseCase = new ListUsersUseCase(usersRepository);
  });

  //   afterEach(() => {});

  it('should be able to find a user by id', async () => {
    const user = await usersRepository.create({
      name: 'Leandro Dias',
      email: 'leandro@test.com',
      password_hash: '123456',
    });

    const searchingForId = await listUserUseCase.execute(user);

    expect(searchingForId).toEqual(user);
  });

});
