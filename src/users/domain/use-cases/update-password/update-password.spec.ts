import { compare, hash } from 'bcryptjs';
import { UpdatePasswordUseCase } from './update-password';
import { IUsersRepository } from '../../interfaces';
import { InMemoryUsersRepository } from '../../test/in-memory/in-memory-users-repository';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
  CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD,
  INCORRECT_CURRENT_PASSWORD,
} from '@/shared/constants/errors';

describe('Update Password Use Case', () => {
  let usersRepository: IUsersRepository;
  let sut: UpdatePasswordUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdatePasswordUseCase(usersRepository);
  });

  it('should be able to update a password and hash it', async () => {
    const originalPassword = 'originalPassword123';
    const user = await usersRepository.create({
      id: 'id-1',
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: await hash(originalPassword, 6),
    });

    const newPassword = 'abC123!@#';
    await sut.execute(user.id, {
      currentPassword: originalPassword,
      newPassword,
      confirmNewPassword: newPassword,
    });

    const updatedUser = await usersRepository.findById(user.id);
    expect(await compare(newPassword, updatedUser.password_hash)).toBe(true);
  });

  it('should throw an HttpException if current password is incorrect', async () => {
    const originalPassword = 'originalPassword123';
    const user = await usersRepository.create({
      id: 'id-1',
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: await hash(originalPassword, 6),
    });

    const newPassword = 'abC123!@#';
    await expect(
      sut.execute(user.id, {
        currentPassword: 'incorrectPassword',
        newPassword,
        confirmNewPassword: newPassword,
      }),
    ).rejects.toThrow(HttpException);
    await expect(
      sut.execute(user.id, {
        currentPassword: 'incorrectPassword',
        newPassword,
        confirmNewPassword: newPassword,
      }),
    ).rejects.toThrow(
      new HttpException(INCORRECT_CURRENT_PASSWORD, HttpStatus.UNAUTHORIZED),
    );
  });

  it('should throw an HttpException if new password and confirm new password do not match', async () => {
    const originalPassword = 'originalPassword123';
    const user = await usersRepository.create({
      id: 'id-1',
      name: 'Leandro Diass',
      email: 'leandrddo@test.com',
      password_hash: await hash(originalPassword, 6),
    });

    const newPassword = 'abC123!@#';
    const confirmNewPassword = 'differentPassword';
    await expect(
      sut.execute(user.id, {
        currentPassword: originalPassword,
        newPassword,
        confirmNewPassword,
      }),
    ).rejects.toThrow(HttpException);
    await expect(
      sut.execute(user.id, {
        currentPassword: originalPassword,
        newPassword,
        confirmNewPassword,
      }),
    ).rejects.toThrow(
      new HttpException(
        CONFIRM_PASSWORD_IS_DIFERENT_NEW_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      ),
    );
  });
});
