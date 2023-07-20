import { HttpException, HttpStatus } from '@nestjs/common';

import { IUsersRepository } from '../../interfaces';
import { InMemoryUsersRepository } from '../../test/in-memory/in-memory-users-repository';
import { ListUsersUseCase } from './list-user-data';
import { USER_DOES_NOT_EXIST } from '@/shared/constants/errors';

describe('List Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: ListUsersUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new ListUsersUseCase(usersRepository);
  });

  describe('Sucess test', () => {
    it('should be able to return a user by id', async () => {
      const user = await usersRepository.create({
        name: 'Leandro Diass',
        email: 'leandrddo@test.com',
        password_hash: '123456',
      });

      const searchForId = await sut.execute(user.id);

      expect(searchForId).toBe(user);
    });
  });

  describe('Fail test', () => {
    it('should not be able to list user with field delete true', async () => {
      const deletedUser = {
        id: 'id-fake',
        name: 'Leandro Diass',
        email: 'leandrddo@test.com',
        password_hash: '123456',
        created_at: new Date(),
        deleted: true,
      };

      await usersRepository.create(deletedUser);

      await expect(sut.execute('id-fake')).rejects.toThrow(
        new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND),
      );
    });

    it('should not be able to list user that does not exist', async () => {
      const fakeUserId = 'fake-id';

      await expect(sut.execute(fakeUserId)).rejects.toThrow(
        new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND),
      );
    });
  });
});
