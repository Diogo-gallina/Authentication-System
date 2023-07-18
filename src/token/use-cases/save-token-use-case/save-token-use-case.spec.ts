import { SaveTokenUseCase } from './save-token-use-case';
import { ITokenRepository } from '@/token/interfaces';

describe('SaveTokenUseCase', () => {
  let useCase: SaveTokenUseCase;
  let tokenRepository: ITokenRepository;

  beforeEach(() => {
    tokenRepository = {
      create: jest.fn(),
      findToken: jest.fn(),
    };

    useCase = new SaveTokenUseCase(tokenRepository);
  });

  it('should save token successfully', async () => {
    const token = 'abcd1234';
    const userId = 'user123';

    await useCase.execute({ token, userId });

    expect(tokenRepository.create).toHaveBeenCalledWith({
      token,
      user_id: userId,
    });
  });
});
