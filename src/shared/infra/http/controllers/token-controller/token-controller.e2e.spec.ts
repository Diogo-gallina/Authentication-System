import { Test } from '@nestjs/testing';
import { TokenController } from './token-controller';
import { RefreshTokenUseCase } from '@/token/domain/use-cases';
import { RefreshTokenDto } from '@/token/domain/dtos';

describe('TokenController', () => {
  let controller: TokenController;
  let refreshTokenUseCase: RefreshTokenUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [
        {
          provide: RefreshTokenUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<TokenController>(TokenController);
    refreshTokenUseCase =
      moduleRef.get<RefreshTokenUseCase>(RefreshTokenUseCase);
  });

  describe('refreshToken', () => {
    it('should call the RefreshTokenUseCase with the provided data', async () => {
      const refreshTokenDto: RefreshTokenDto = {
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlblR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNjg5ODgwNTQyLCJleHAiOjE2ODk4ODA2MDJ9.pvb_akzcwmjSrz_DPsb_cLu0uUqHD6RIVEy_beau9TI',
      };

      await controller.refreshToken(refreshTokenDto);

      expect(refreshTokenUseCase.execute).toHaveBeenCalledWith(refreshTokenDto);
    });
  });
});
