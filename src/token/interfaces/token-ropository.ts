import { ISaveToken } from './save-token';

export abstract class ITokenRepository {
  abstract save(data: ISaveToken): Promise<void>;
}
