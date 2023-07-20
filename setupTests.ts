import { jwtConstants } from '@/shared/constants/jwt-constants';
import { JwtModule } from '@nestjs/jwt';

JwtModule.register({
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1h' },
});
