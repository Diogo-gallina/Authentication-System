import { InMemoryTokenRepository } from '../../test/in-memory/in-memory-tokens-repository';
import { SaveTokenUseCase } from './save-token-use-case';
import { ITokenRepository } from '@/token/domain/interfaces';

describe('SaveTokenUseCase', () => {
  let tokenRepository: ITokenRepository;
  let sut: SaveTokenUseCase;

  beforeEach(() => {
    tokenRepository = new InMemoryTokenRepository();
    sut = new SaveTokenUseCase(tokenRepository);
  });

  it('should save token successfully', async () => {
    const accessToken = 'abcd1234';
    const userId = 'user123';
    const refreshToken = 'asdadef9423';

    await sut.execute({ accessToken, userId, refreshToken });

    const savedToken = await tokenRepository.findExistingToken(userId);

    expect(savedToken?.accessToken).toBe(accessToken);
    expect(savedToken?.user_id).toBe(userId);
    expect(savedToken?.refreshToken).toBe(refreshToken);
  });
});
