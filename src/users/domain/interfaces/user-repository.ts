import { Prisma, User } from '@prisma/client';
import { ValidateUpdatePasswordDto } from '../dtos/validate-update-password-dto';

export abstract class IUsersRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract softDeleteUser(id: string): Promise<void>;
  abstract updatePassword(data: ValidateUpdatePasswordDto): Promise<void>;
}
