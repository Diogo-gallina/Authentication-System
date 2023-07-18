import { Prisma, Token } from '@prisma/client';

export abstract class ITokenRepository {
  abstract save(data: Prisma.TokenUncheckedCreateInput): Promise<Token>;
  abstract findById(userId: string): Promise<Token>;
  abstract updateRefreshToken(data: Token): Promise<void>;
}
