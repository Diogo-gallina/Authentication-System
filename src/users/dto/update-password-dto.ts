import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class IUpdatePassword {
  @IsString()
  @IsNotEmpty({ message: 'I id field cannot be empty' })
  @IsUUID('all', { message: 'id needs to be in the pattern uuid' })
  id: string;

  @IsString()
  @IsNotEmpty({ message: 'I current password field cannot be empty' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'I new password field cannot be empty' })
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(32, { message: 'Password is too long ' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).*$/, {
    message:
      'New password must have at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character',
  })
  newPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'I confirm new password field cannot be empty' })
  confirmNewPassword: string;
}
