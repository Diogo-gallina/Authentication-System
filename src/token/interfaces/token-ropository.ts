import { Prisma, Token } from '@prisma/client';

export abstract class ITokenRepository {
  abstract create(data: Prisma.TokenUncheckedCreateInput): Promise<Token>;
  abstract findExistingToken(user_id: string): Promise<Token>;
  abstract createToken(data: Prisma.TokenUncheckedCreateInput): Promise<Token>;
  abstract updateAccessToken(id: string, accessToken: string);
  abstract findToken(token: string): Promise<Token>;
  abstract updateToken(
    id: string,
    accessToken: string,
    refreshToken: string,
  ): Promise<Token>;
}
