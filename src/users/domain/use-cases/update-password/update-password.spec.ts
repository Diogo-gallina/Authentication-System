import { compare } from 'bcryptjs';

import { IUsersRepository } from '@/users/interfaces/';
import { InMemoryUsersRepository } from '@/users/test/in-memory/in-memory-users-repository';
import { UpdatePasswordUseCase } from './update-password';

describe('Update Password Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: UpdatePasswordUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdatePasswordUseCase(usersRepository);
  });

  it('should be able to update a password and hasher it', async () => {
    const user = await usersRepository.create({
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: '123456',
    });

    await sut.execute({
      id: user.id,
      currentPassword: user.password_hash,
      newPassword: 'abC123!@#',
      confirmNewPassword: 'abC123!@#',
    });

    await compare('abC123!@#', user.password_hash);

    expect(user.password_hash).toBe('abC123!@#');
  });
});
