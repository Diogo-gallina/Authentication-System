import { User } from '@prisma/client';

import { IRegisterUser } from './register-user';

export abstract class IUserRepository {
  abstract create(data: IRegisterUser): Promise<User>;
}
