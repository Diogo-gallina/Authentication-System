// import { Prisma, Token } from '@prisma/client';

// import { ITokenRepository } from '@/token/interfaces';
// import { GetResult } from '@prisma/client/runtime/library';

// export class InMemoryTokenRepository implements ITokenRepository {
//   findExistingToken(user_id: string): Promise<GetResult<{ id: string; accessToken: string; refreshToken: string; user_id: string; created_at: Date; }, unknown> & {}> {
//     throw new Error('Method not implemented.');
//   }
//   createToken(data: Prisma.TokenUncheckedCreateInput): Promise<GetResult<{ id: string; accessToken: string; refreshToken: string; user_id: string; created_at: Date; }, unknown> & {}> {
//     throw new Error('Method not implemented.');
//   }
//   updateAccessToken(id: string, accessToken: string): Promise<GetResult<{ id: string; accessToken: string; refreshToken: string; user_id: string; created_at: Date; }, unknown> & {}> {
//     throw new Error('Method not implemented.');
//   }
//   updateToken(id: string, accessToken: string, refreshToken: string): Promise<GetResult<{ id: string; accessToken: string; refreshToken: string; user_id: string; created_at: Date; }, unknown> & {}> {
//     throw new Error('Method not implemented.');
//   }
//   public items: Token[] = [];

//   async create(data: Token): Promise<Token> {
//     const { user_id, accessToken, refreshToken } = data;

//     const existingToken = this.items.find((t) => t.user_id === user_id);

//     if (existingToken) {
//       existingToken.accessToken = accessToken;
//       return existingToken;
//     }

//     const newToken: Token = {
//       id: Math.random().toString(),
//       user_id,
//       accessToken,
//       refreshToken,
//       created_at: new Date(),
//     };

//     this.items.push(newToken);

//     return newToken;
//   }

//   async findToken(token: string) {
//     const objToken = this.items.find((item) => item.accessToken === token);

//     if (!objToken) {
//       return null;
//     }

//     return objToken;
//   }
// }
