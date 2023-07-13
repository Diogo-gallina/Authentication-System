import { DeleteUserUseCase } from './delete-user';
import { IUsersRepository } from '@/users/interfaces/';
import { InMemoryUsersRepository } from '@/users/test/in-memory/in-memory-users-repository';

describe('Delete Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: DeleteUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to find a user by id', async () => {
    const user = await usersRepository.create({
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: '123456',
    });

    const searchingForId = await sut.execute({ id: user.id });

    expect(searchingForId).toBe(user);
  });
});
