import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ISingInDto {
  @IsEmail({}, { message: 'The e-mail is invalid.' })
  @IsNotEmpty({ message: 'I email field cannot be empty' })
  @MinLength(8, { message: 'Email is too short' })
  @MaxLength(200, { message: 'Email is too long ' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'I password field cannot be empty' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(32, { message: 'Password is too long ' })
  password: string;
}
