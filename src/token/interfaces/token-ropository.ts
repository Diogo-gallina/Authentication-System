import { Prisma, Token } from '@prisma/client';

export abstract class ITokenRepository {
  abstract create(data: Prisma.TokenUncheckedCreateInput): Promise<Token>;
  abstract refrashToken(oldToken: string);
  abstract findToken(token: string): Promise<Token>;
}
