import { User } from '@prisma/client';

export abstract class IRegisterUseCaseResponse {
  user: User;
}
