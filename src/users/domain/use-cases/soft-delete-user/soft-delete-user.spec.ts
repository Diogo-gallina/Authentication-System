import { HttpException, HttpStatus } from '@nestjs/common';

import { IUsersRepository } from '../../interfaces';
import { InMemoryUsersRepository } from '../../test/in-memory/in-memory-users-repository';
import { SoftDeleteUserUseCase } from './soft-delete-user';
import { USER_DOES_NOT_EXIST } from '@/shared/constants/errors';

describe('Soft Delete Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: SoftDeleteUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new SoftDeleteUserUseCase(usersRepository);
  });

  describe('Sucess test', () => {
    it('should be able to soft delete a user', async () => {
      const user = await usersRepository.create({
        id: 'id-01',
        name: 'Leandro Diass',
        email: 'leandrddo@test.com',
        password_hash: '123456',
      });

      await sut.execute(user.id);

      const searchForId = await usersRepository.findById(user.id);

      expect(searchForId.deleted).toBe(true);
    });
  });

  describe('Fail test', () => {
    it('should return null when looking for an id that doesnt exist', async () => {
      const searchForId = await usersRepository.findById('fake-id');

      expect(searchForId).toBe(null);
    });

    it('should not delete a user, because he is already deleted', async () => {
      const user = await usersRepository.create({
        id: 'id-01',
        name: 'Leandro Diass',
        email: 'leandrddo@test.com',
        password_hash: '123456',
        deleted: true,
      });

      await expect(() => sut.execute(user.id)).rejects.toThrow(
        new HttpException(USER_DOES_NOT_EXIST, HttpStatus.NOT_FOUND),
      );
    });
  });
});
