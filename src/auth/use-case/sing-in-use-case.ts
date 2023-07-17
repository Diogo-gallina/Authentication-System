import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { ISingInUseCase } from '../interfaces/sing-in-use-case';
import { INVALID_CREDENTIALS_ERROR } from '@/shared/constants/erros';
import { IAuthRepository } from '../interfaces/auth-repositoey';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SingInUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: ISingInUseCase) {
    const user = await this.authRepository.findByEmail(email);

    console.log(user);

    if (!user) throw new Error(INVALID_CREDENTIALS_ERROR);

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) throw new Error(INVALID_CREDENTIALS_ERROR);

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    
    return {
      token,
    };
  }
}
