import { ITokenRepository } from '@/token/domain/interfaces';
import { GenerateAccessTokenUseCase } from './generate-access-token-use-case';
import { InMemoryTokenRepository } from '../../test/in-memory/in-memory-tokens-repository';

describe('SaveTokenUseCase', () => {
  let tokenRepository: ITokenRepository;
  let sut: GenerateAccessTokenUseCase;

  beforeEach(() => {
    tokenRepository = new InMemoryTokenRepository();
    sut = new GenerateAccessTokenUseCase(tokenRepository);
  });

  it('should', async () => {
    
  });
});
