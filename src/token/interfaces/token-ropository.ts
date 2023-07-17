export abstract class ITokenRepository {
  abstract save(token: string, user_id: string): Promise<void>;
}
