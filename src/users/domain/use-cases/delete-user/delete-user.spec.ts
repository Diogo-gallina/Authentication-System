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

  it('should be able to delete a user', async () => {
    const user = await usersRepository.create({
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: '123456',
    });

    await sut.execute(user.id);

    const searchForId = await usersRepository.findById(user.id);

    expect(searchForId).toBe(null);
  });
});
