import { IUsersRepository } from '../../interfaces';
import { InMemoryUsersRepository } from '../../test/in-memory/in-memory-users-repository';
import { SoftDeleteUserUseCase } from './soft-delete-user';

describe('Delete Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: SoftDeleteUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SoftDeleteUserUseCase(usersRepository);
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
