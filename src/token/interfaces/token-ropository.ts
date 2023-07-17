import { Prisma, Token } from '@prisma/client';

export abstract class ITokenRepository {
  abstract save(data: Prisma.TokenCreateInput): Promise<Token>;
}
