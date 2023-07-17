import { User } from '@prisma/client';

export abstract class IAuthRepository {
  abstract findByEmail(email: string): Promise<User | null>;
}
