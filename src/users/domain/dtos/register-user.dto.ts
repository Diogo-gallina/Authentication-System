import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
  Matches,
} from 'class-validator';

import { TwoWordNameValidator } from '@/shared/utils';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'I name field cannot be empty' })
  @MinLength(6, { message: 'Name is too short' })
  @MaxLength(64, { message: 'Name is too long ' })
  @Validate(TwoWordNameValidator, {
    message: 'Name must be at least two words.',
  })
  name: string;

  @IsEmail({}, { message: 'The e-mail is invalid.' })
  @IsNotEmpty({ message: 'I email field cannot be empty' })
  @MinLength(8, { message: 'Email is too short' })
  @MaxLength(200, { message: 'Email is too long ' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'I password field cannot be empty' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(32, { message: 'Password is too long ' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/, {
    message:
      'Password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string;
}
