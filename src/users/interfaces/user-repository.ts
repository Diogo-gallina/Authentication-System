import { Prisma, User } from '@prisma/client';
import { IUpdatePassword } from './update-password';

export abstract class IUsersRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract deleteUser(id: string): Promise<void>;
  abstract updatePassword(data: IUpdatePassword): Promise<void>;
}
